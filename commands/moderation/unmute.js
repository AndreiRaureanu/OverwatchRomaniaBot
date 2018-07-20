const {Command} = require('discord.js-commando');
const {Role} = require('discord.js');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: 'Unmutes a user in the server',
            guildOnly: true,
            userPermissions: ['MANAGE_ROLES'],
            examples: ['unmute @User'],
            args: [
                {
                    key: 'member',
                    prompt: 'Which user do you want to ban?',
                    type: 'member'
                }
            ]
        });
    }

    run(msg, {member}) {
        const muteRole = msg.guild.roles.find(role => role.name === 'muted');
        console.log(muteRole instanceof Role);   
        if(member.roles.exists('name', 'muted')) {
            member.removeRole(muteRole.id);
            //logsChannel.send(`Muted ${member.user.tag} for reason: \`${reason}\``);
            return msg.say(`:ok_hand: unmuted ${member.user.tag}`);
        } else {
            return msg.say(':no_entry_sign: invalid permission.');
        }
    }
}