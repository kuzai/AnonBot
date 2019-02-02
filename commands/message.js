const Discord = require('discord.js');
const log = require('simple-node-logger').createSimpleFileLogger('messages.log');

module.exports = {
	name: 'message',
	description: 'Sends a normal anon message. This is the default dm command',
	execute(message, args) {
        if(args instanceof Discord.Channel) {
            var mes = message.content;
            
            var atts = message.attachments.array();
            var attUrls = [];

            atts.forEach(element => {
                attUrls.push(element.url);
            });
            console.log(mes);
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