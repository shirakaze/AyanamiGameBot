const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");

module.exports = new Command({
    name: "load",
    description: "Load a torpedo!",
    permission: "SEND_MESSAGES",
    run: async (message, args, client, cache) => {

        const embed = new Discord.MessageEmbed();
        const shipOwner = message.author

        embed.setTitle("Torpedo Stock")
            // .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setColor('#6c42f5')
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic : true}))
            // .setDescription(`${ attackedUser } has been hit for 1 damage!`)
            .setDescription(`[Placeholder]`)
            .setTimestamp(message.createdTimestamp)
            .setImage('https://azurlane.netojuu.com/images/9/93/AyanamiShipyardIcon.png')
            .setThumbnail(`${shipOwner.avatarURL({ dynamic: true })}`)
            .addFields(
                {
                    name: "Selected Ship",
                    value: 'Ayanami',
                    inline: false
                },
                {
                    name: "Current HP",
                    value: `[Insert Emojis for HP Bar]\n**${shipOwner.username}**'s Ayanami's HP: 10/10`,
                    inline: false
                },
                {
                    name: "Torpedoes Stored",
                    value: `0/5 ${Emotes.Torpedo}`,
                    inline: false
                }
            )
            .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        message.channel.send({ embeds: [embed] });
    }
})