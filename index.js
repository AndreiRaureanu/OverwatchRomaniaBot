//const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '!',
    owner: '265926378690576384',
    disableEveryone: true,
    unknownCommandResponse: false
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Moderation Related Command Group'],
        ['overwatch', 'Overwatch Related Command Group']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () =>{
    console.log("Logged in!");
})

client.login('INSERT TOKEN HERE');
