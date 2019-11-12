var config = require('../config.json');
module.exports = {
	name: 'help',
	description: 'Get list of commands',
	execute(message, args) {
        const helpMesg = "This bot is designed to allow you to chat anonymously on the Fate Server.\n" +
        "give it a shot by sending the bot a **dm**!\n" + 
        "you can also send an nsfw message anon by starting your dm with \""+ config.prefix + "nsfw\"\n Additionally, you can message someone else's anonymous account with " + config.prefix + "dm name";
		message.channel.send(helpMesg);
	},
};
