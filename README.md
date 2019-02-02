# AnonBot
AnonBot is a Discord Bot that you can set up locally to allow your users to chat anonymously. 
It supports file uploads, nsfw distinction, and is easy to use for higher interaction!

To use AnonBot, you need to have a config.json file in the root folder of the directory.

## How to use AnonBot
If AnonBot is in your server, you can run ">help to get some instructions from AnonBot on how to use the bot. 
Please note that the the token used to activate AnonBot is configurable, so your server may be set up slighly differently
than listed here.
If you would like to send an anonymous message on your server running AnonBot, simply DM the bot with what you would like 
to say. If you would like to post in the server provided nsfw channel anonymously, simply type ">nsfw" before your message!
AnonBot supports file uploads as well. Please be sure to caption each image with ">nsfw" if uploading from desktop since it requires you to upload files single file.

## Example Config:
```
{
    "prefix": ">",
    "token": "bot-token-from-discord-bot-control-panel",
    "anonChannelId": "desired-channel-id-from-server",
    "anonNsfwId": "desired-channel-id-from-server"
}
```
## Installation Instructions and Dependencies
Please be sure to download node.js with npm included. With that done, you can simply run 
`npm install` from the root directory of this project and it will download the required dependencies for you!
## Running AnonBot
From the root directory of the project execute `node index.js` after setting up your config.json file
