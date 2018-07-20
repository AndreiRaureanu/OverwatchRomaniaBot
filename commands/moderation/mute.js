const {Command} = require('discord.js-commando');
const {RichEmbed, Role} = require('discord.js');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mutes a user in the server',
            guildOnly: true,
            userPermissions: ['MANAGE_ROLES'],
            examples: ['mute @User reason'],
            args: [
                {
                    key: 'member',
                    prompt: 'Which user do you want to mute?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for the mute?',
                    type: 'string',
                    default: 'none'
                }
            ]
        });
    }

    run(msg, {member, reason}) {
        const muteRole = msg.guild.roles.find(role => role.name === 'muted');
        console.log(muteRole instanceof Role);   
        const logsChannel = msg.guild.channels.find(channel => channel.name === 'logs');
        const userIcon = member.user.avatarURL;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        if(member.roles.exists('name', 'muted')) {
            return msg.say(':no_entry_sign: user already muted.');
        } else {
            member.addRole(muteRole.id);
            const embed = new RichEmbed()
                .setTitle('Moderation Action Taken')
                .setColor('#f4d942')
                .setThumbnail(userIcon)
                .addField('Type', 'Mute')
                .addField('User', member.user.tag)
                .addField('Date', dateTime)
                .addField('Reason', reason)
                .setFooter('E1D0nt3 ver 0.01');
            //logsChannel.send(`Muted ${member.user.tag} for reason: \`${reason}\``);
            logsChannel.send(embed);
            return msg.say(`:ok_hand: muted ${member.user.tag} (\`${reason}\`)`);
        }
    }
}