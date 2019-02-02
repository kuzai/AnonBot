const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'nsfw',
	description: 'Send an anon message to nsfw channel',
	execute(message, args) {
        if(args instanceof Discord.Channel) {
            var mes = message.content.substring(config.prefix.length + 5); //5 for nsfw + ' '
            var atts = message.attachments.array();
            var attUrls = [];
            atts.forEach(element => {
                attUrls.push(element.url);
            });
            args.send(mes, {files: attUrls})
                .then(() => message.react("🔥"))
                .then(() => {
                    console.log(message.author.username + ": " + message.content);
                    console.log(attUrls);
                })
                .catch(console.error);
        }

        else message.reply("Args wasn't a Discord Channel?")
                .then(() => message.react(":ok:"))
                .catch(console.error);
        
	},
};