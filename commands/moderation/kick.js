const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kicks a user from the server',
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
            examples: ['kick @User reason'],
            args: [
                {
                    key: 'member',
                    prompt: 'Which user do you want to kick?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for the kick?',
                    type: 'string',
                    default: 'none'
                }
            ]
        });
    }

    run(msg, {member, reason}) {
        const logsChannel = msg.guild.channels.find(channel => channel.name === 'logs');
        const userIcon = member.user.avatarURL;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        if(member.kickable) {
            member.kick(reason);
            const embed = new RichEmbed()
            .setTitle('Moderation Action Taken')
            .setColor('#f4d942')
            .setThumbnail(userIcon)
            .addField('Type', 'Kick')
            .addField('User', member.user.tag)
            .addField('Date', dateTime)
            .addField('Reason', reason)
            .setFooter('E1D0nt3 ver 0.01');
            //logsChannel.send(`Kicked ${member.user.tag} for reason: \`${reason}\``);
            logsChannel.send(embed);
            return msg.say(`:ok_hand: kicked ${member.user.tag} (\`${reason}\`)`);
        } else return msg.say(':no_entry_sign: invalid permission.');
    }
}