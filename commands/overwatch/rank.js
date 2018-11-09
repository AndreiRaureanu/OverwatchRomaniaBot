const {Command} = require('discord.js-commando');
const OverwatchAPI = require('overwatch.js');

module.exports = class RankCommand extends Commandnpm  {
    constructor(client) {
        super(client, {
            name: 'rank',
            group: 'overwatch',
            memberName: 'rank',
            description: 'Gives a user its respective rank in Overwatch as a role',
            guildOnly: true,
            examples: ['rank User#1234'],
            args: [
                {
                    key: 'tag',
                    prompt: 'What is your Battle.Net tag?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, {tag}) {
        const bronze = msg.guild.roles.find(role => role.name === 'Bronze');
        const silver = msg.guild.roles.find(role => role.name === 'Silver');
        const gold = msg.guild.roles.find(role => role.name === 'Gold');
        const platinum = msg.guild.roles.find(role => role.name === 'Platinum');
        const master = msg.guild.roles.find(role => role.name === 'Master');
        const grandmaster = msg.guild.roles.find(role => role.name === 'Grandmaster');
        
    }
}