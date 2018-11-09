const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'moderation',
            memberName: 'userinfo',
            description: 'Displays information about the queried user',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            examples: ['userinfo @User'],
            args: [
                {
                    key: 'member',
                    prompt: 'Which user do you want to info?',
                    type: 'member'
                }
            ]
        });
    }

    run(msg, {member}) {
        const userIcon = member.user.avatarURL;
        // const roles = member.roles.array().toString();
        const embed = new RichEmbed()
            .setColor('#f4d942')
            .setThumbnail(userIcon)
            .addField('❯Created At', member.user.createdAt)
            .addField('❯Joined At', member.joinedAt)
            .addField('❯Roles', `${member.roles.map(roles => `${roles.name}`).join(', ')}`)
            .setFooter('E1D0nt3 ver 0.01');
        return msg.embed(embed);
    }
}