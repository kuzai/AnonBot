const Discord = require('discord.js');
const config = require('../config.json');
const log = require('simple-node-logger').createSimpleFileLogger('nsfw.log');

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
                    message.acknowledge()
                        .catch(console.error);
                    console.log(message.author.username + ": " + message.content);
                    console.log(attUrls);
                    log.info(message.author.username, ": ", message.content);
                    log.info(message.author.username, ": ", attUrls);
                })
                .catch(console.error);
        }

        else message.reply("Args wasn't a Discord Channel?")
                .then(() => message.react("🔥"))
                .catch(console.error);
        
	},
};