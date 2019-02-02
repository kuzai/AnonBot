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
//const prefix = ">";

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Client is Ready!");
});




client.on("message", message => {
    if (message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

    if(message.channel instanceof Discord.DMChannel) {
        if(command == "nsfw") {
            var arg = client.channels.get(config.anonNsfwId);
            client.commands.get(command).execute(message, arg);
        }
        else {
            var arg = client.channels.get(config.anonChannelId);
            client.commands.get("message").execute(message, arg);
        }
        return;
    }
    
    else if(message.content.startsWith(prefix)){
        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("That command wasn't found. Try \">help\"");
        }
        return;
    }
	
});

client.login(config.token)
    .then(console.log)
    .catch(console.error);