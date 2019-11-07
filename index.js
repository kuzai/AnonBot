const fs = require('fs');
const config = require('./config.json');


const prefix = config.prefix;

console.log("token: " + config.token);
console.log("prefix: " + config.prefix);

const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const messageCommand = "message";

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "kuzai",
  password: "!",
  database: "anonbot"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), anon VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

//const prefix = ">";

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Client is Ready!");
    client.user.setPresence({
        game: {
            name: config.prefix + "help For Help!"
        }
    });
});




client.on("message", message => {
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log("Args: " + args + " Command: " + command);
    if(message.channel instanceof Discord.DMChannel) {
        if(command == "nsfw") {
	    console.log("User: " + message.author.username);
	    var sql = "SELECT anon FROM users WHERE name='" + message.author.username + "' LIMIT 1";
	    var uuid = "";
	    con.query(sql, function(err, result) {
		uuid = result[0].anon;
		if(err) {
		    uuid = "";
		    console.log("Lookup of user failed " + err);
		}
		//Object.keys(result).forEach(function(key) {
      		//	var row = result[key];
      		//	console.log(row);
		//	console.log(key);
    		//}); 
		console.log("NSFW REQUEST FROM: " + result[0]);
		var arg = client.channels.get(config.anonNsfwId);
            	client.commands.get(command).execute(message, arg, uuid);
	    });
        }
	else if(command == "id") {
	    // insert new id into database so we can get it later
	    var anon = args[0] + "";
	    var sql = "INSERT INTO users (name, anon) VALUES ('" + message.author.username + "', '" + anon + "') ON DUPLICATE KEY UPDATE anon='" + anon + "'";
  	    con.query(sql, function (err, result) {
    	    if (err) throw err;
    	    console.log("1 record inserted, ID: " + args[0]);
  	    });
	}
	else if(command == "dm") {
	    //run the dm command, taking username and user to dm as arguments
	    var sql = "SELECT name FROM users WHERE anon='" + args[0] + "' LIMIT 1";
	    var uuid = "";
	    con.query(sql, function(err, result) {
		uuid = result[0].name;
		var chan = "";
		if(err) {
		    uuid = "";
		    console.log("Lookup of user failed " + err);
		}
	    	sql = "SELECT anon FROM users WHERE name='" + message.author.username + "' LIMIT 1";
	    	con.query(sql, function(err, result2) {
			var uuid2 = result2[0].anon;
			if(err) {
		    		uuid2 = "";
		    		console.log("Lookup of user failed " + err);
			}
			console.log("REQUEST FROM: " + result[0]);
			var guilds = client.guilds.array();
			guilds.forEach(function(guild) {
				var users = guild.members.array();
				users.forEach(function(user) {
					if(user.User.username == uuid) {
						chan = user.User;
					}
				});
			});
			var arg = client.fetchUser(uuid);
                	client.commands.get("dm").execute(message, chan, uuid2);
		});
		
		
		//Object.keys(result).forEach(function(key) {
      		//	var row = result[key];
      		//	console.log(row);
		//	console.log(key);
    		//}); 
	    });
 
	}
        else {
	    var sql = "SELECT anon FROM users WHERE name='" + message.author.username + "' LIMIT 1";
	    var uuid = "";
	    con.query(sql, function(err, result) {
		uuid = result[0].anon;
		if(err) {
		    uuid = "";
		    console.log("Lookup of user failed " + err);
		}
		//Object.keys(result).forEach(function(key) {
      		//	var row = result[key];
      		//	console.log(row);
		//	console.log(key);
    		//}); 
		console.log("REQUEST FROM: " + result[0]);
		var arg = client.channels.get(config.anonChannelId);
                client.commands.get("message").execute(message, arg, uuid);
	    });
  
        }
        return;
    }
    
    else if(message.content.startsWith(prefix)){
        try {
            client.commands.get(command).execute(message, args, client.author.user);
        } catch (error) {
            console.error(error);
            message.reply("That command wasn't found. Try \"" + prefix + "help\"");
        }
        return;
    }
	
});

client.login(config.token)
    .then(console.log)
    .catch(console.error);
