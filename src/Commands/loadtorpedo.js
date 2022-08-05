const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");
const users = require("../Model/DatabaseFunctions/users");
const Colours = require("../Data/colours.json")

module.exports = new Command({
    name: "load",
    description: "Load a torpedo!",
    permission: "SEND_MESSAGES",
    run: async (message, args, client) => {

        function Embed1(message, shipOwner, health, newtorpedoStock) {
            const embed1 = new Discord.MessageEmbed();
            embed1.setTitle("Torpedo Stock")
                // .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                .setColor(`${Colours.green}`)
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setDescription(`Action succeeded. 1 Torpedo added.`)
                .setTimestamp(message.createdTimestamp)
                .setImage('https://azurlane.netojuu.com/images/9/93/AyanamiShipyardIcon.png')
                .setThumbnail(`${shipOwner.avatarURL({ dynamic: true })}`)
                .addFields(
                    {
                        name: "Active Ship",
                        value: 'Ayanami',
                        inline: false
                    },
                    {
                        name: "Current HP",
                        value: `[Insert Emojis for HP Bar]\n**${shipOwner.username}**'s Ayanami's HP: ${health}/10 ${Emotes.Health}`,
                        inline: false
                    },
                    {
                        name: "Torpedoes Stored",
                        value: `${newtorpedoStock}/5 ${Emotes.Torpedo}`,
                        inline: false
                    }
                )
                .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

            return embed1
        }

        function Embed2(message, shipOwner, health, torpedoStock) {
            const embed2 = new Discord.MessageEmbed();
            embed2.setTitle("Torpedo Stock")
                // .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                .setColor(`${Colours.red}`)
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                // .setDescription(`${ attackedUser } has been hit for 1 damage!`)
                .setDescription(`Action failed. 0 Torpedoes added.\nCommander, your ship is at maximum capacity!\nShe can't take anymore!`)
                .setTimestamp(message.createdTimestamp)
                .setImage('https://azurlane.netojuu.com/images/9/93/AyanamiShipyardIcon.png')
                .setThumbnail(`${shipOwner.avatarURL({ dynamic: true })}`)
                .addFields(
                    {
                        name: "Active Ship",
                        value: 'Ayanami',
                        inline: false
                    },
                    {
                        name: "Current HP",
                        value: `[Insert Emojis for HP Bar]\n**${shipOwner.username}**'s Ayanami's HP: ${health}/10 ${Emotes.Health}`,
                        inline: false
                    },
                    {
                        name: "Torpedoes Stored",
                        value: `${torpedoStock}/5 ${Emotes.Torpedo}`,
                        inline: false
                    }
                )
                .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

            return embed2
        }

        const discordID = message.author.id
        const shipOwner = message.author
        // Change Max Torpedo Stock
        const maxtorpedoStock = 5
        const currentShip = client.usercache.get(message.author.id).currentShip
        const health = client.usercache.get(message.author.id).health

        var torpedoStock = client.usercache.get(message.author.id).torpedoStock
        if (torpedoStock >= maxtorpedoStock) return await message.channel.send({ embeds: [Embed2(message, shipOwner, health, torpedoStock)]})
        users.addtorpedoStock(discordID, ++torpedoStock, (err, result) => {
            if (err) return console.log(err)
            client.usercache.get(message.author.id).torpedoStock = torpedoStock
            message.channel.send({ embeds: [Embed1(message, shipOwner, health, torpedoStock)]})
        })
    }
})

        // "[Insert Ship Name] is at maximum capacity, you can't load anymore torpedoes! (also change the maxtorpedoStock)"
