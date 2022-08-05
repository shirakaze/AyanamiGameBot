const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");
const Colours = require("../Data/colours.json");
const Config = require("../Data/config.json");

module.exports = new Command({
    name: "shipstatus",
    description: "Check your Active Ship's status",
    permission: "SEND_MESSAGES",
    run: async (message, args, client) => {

        function statusDisplay(message, currentShip, health, status, torpedoStock) {
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`**${message.author.username}'s** Active Ship`)
                .setColor(`${Colours.green}`)
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setDescription(`Your **${currentShip}'s** Status`)
                .setTimestamp(message.createdTimestamp)
                .setImage('https://azurlane.netojuu.com/images/0/08/AyanamiChibi.png')
                .setThumbnail(`${message.author.avatarURL({ dynamic: true })}`)
                .addFields(
                    {
                        name: "Current Active Ship",
                        value: `${currentShip}`,
                        inline: false
                    },
                    {
                        name: "Status",
                        value: `${status}`,
                        inline: true
                    },
                    {
                        name: `Health ${Emotes.Health}`,
                        value: `${health} ${Emotes.Health}`,
                        inline: false
                    },
                    {
                        name: `Torpedoes Stored ${Emotes.Torpedo}`,
                        value: `${torpedoStock} ${Emotes.Torpedo}`,
                        inline: true
                    }
                )
                .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

            return embed
        }

        const currentShip = client.usercache.get(message.author.id).currentShip
        const torpedoStock = client.usercache.get(message.author.id).torpedoStock
        const health = client.usercache.get(message.author.id).health
        var status = health > 0 ? "Afloat" : "Sunk"

        await message.channel.send({ embeds: [statusDisplay(message, currentShip, health, status, torpedoStock)] })
    }
});