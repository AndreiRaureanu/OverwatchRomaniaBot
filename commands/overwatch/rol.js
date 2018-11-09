const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class RolCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gr',
            group: 'overwatch',
            memberName: 'gr',
            description: 'Gives a user its respective role in Overwatch as a role',
            guildOnly: true,
            examples: ['rank User#1234'],
            args: [
                {
                    key: 'rol',
                    prompt: 'What is your Overwatch role?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, {rol}) {
        const dps = msg.guild.roles.find(role => role.name === 'DPS');
        const tank = msg.guild.roles.find(role => role.name === 'Tank');
        const support = msg.guild.roles.find(role => role.name === 'Support');
        const flex = msg.guild.roles.find(role => role.name === 'Flex');
        const roles = [dps, tank, support, flex];
        const roleNames = ['DPS', 'Tank', 'Support', 'Flex'];
        if(!roleNames.includes(rol)) {
            return msg.say(':no_entry_sign: invalid role. Please choose between DPS, Tank, Support or Flex.')
        }
        const finalRole = msg.guild.roles.find(role => role.name === rol);
        for(var i = 0; i < roles.length; i++) {
            if(msg.member.roles.find(role => role.name === roles[i].name) !== null) {
                msg.member.removeRole(roles[i].id);
                break;
            }
        }
        msg.member.addRole(finalRole.id);
        return msg.say(`:ok_hand: added the role of ${rol} to ${msg.member.user.tag}.`)
    }
}