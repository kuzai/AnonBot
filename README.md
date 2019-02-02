# AnonBot
AnonBot is a Discord Bot that you can set up locally to allow your users to chat anonymously. 
It supports file uploads, nsfw distinction, and is easy to use for higher interaction!

To use AnonBot, you need to have a config.json file in the root folder of the directory.
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
