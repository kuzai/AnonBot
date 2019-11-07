module.exports = {
	name: 'help',
	description: 'Get list of commands',
	execute(message, args) {
        const helpMesg = "This bot is designed to allow you to chat anonymously on the Fate Server.\n" +
        "give it a shot by sending the bot a **dm**!\n" + 
        "you can also send an nsfw message anon by starting your dm with \">!nsfw\"";
		message.channel.send(helpMesg);
	},
};
