const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class ServerinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'moderation',
            memberName: 'serverinfo',
            description: 'Displays information about the current server',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            examples: ['serverinfo']
        });
    }

    run(msg) {
        const serverIcon = msg.guild.iconURL;
        const textNr = msg.guild.channels.filter(channel => channel.type === 'text').array().length;
        const voiceNr = msg.guild.channels.filter(channel => channel.type === 'voice').array().length;
        const rolesNr = msg.guild.roles.array().length;
        const embed = new RichEmbed()
            .setColor('#f4d942')
            .setThumbnail(serverIcon)
            .addField('Server Name',  msg.guild.name)
            .addField('Created On', msg.guild.createdAt)
            .addField('Members', `Total: ${msg.guild.memberCount}\nRoles: ${rolesNr}`)
            .addField('Channels', `Text: ${textNr}\nVoice: ${voiceNr}`)
            .setFooter('E1D0nt3 ver 0.01');
        return msg.embed(embed);
    }
}