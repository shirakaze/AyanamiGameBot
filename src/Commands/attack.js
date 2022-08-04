const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");
const Colours = require("../Data/colours.json");
const users = require("../Model/DatabaseFunctions/users.js")

module.exports = new Command({
    name: "attack",
    description: "Attacks a target",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        function embedAtkSuccess(message, health, status, damagetaken, attackedUser) {
            const embed1 = new Discord.MessageEmbed();
            embed1.setTitle("Attack Result")
                // .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                .setColor(`${Colours.green}`)
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                // .setDescription(`${ attackedUser } has been hit for 1 damage!`)
                .setDescription(`[Insert emojis for hp bar]`)
                .setTimestamp(message.createdTimestamp)
                .setImage('https://azurlane.netojuu.com/images/0/08/AyanamiChibi.png')
                .setThumbnail(`${attackedUser.avatarURL({ dynamic: true })}`)
                .addFields(
                    {
                        name: "Current HP",
                        value: `${attackedUser.username}'s Ayanami's HP: ${health}/10 (-${damagetaken} HP)`,
                        inline: false
                    },
                    {
                        name: "Status",
                        value: `${status}`,
                        inline: false
                    }
                )
                .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

            return embed1
        }

        function embedAtkFailed(message, health, status, damagetaken, attackedUser) {
            const embed2 = new Discord.MessageEmbed();
            embed2.setTitle("Attack Result")
                // .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                .setColor(`${Colours.red}`)
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                // .setDescription(`${ attackedUser } has been hit for 1 damage!`)
                .setDescription(`[Insert emojis for hp bar]`)
                .setTimestamp(message.createdTimestamp)
                .setImage('https://azurlane.netojuu.com/images/0/08/AyanamiChibi.png')
                .setThumbnail(`${attackedUser.avatarURL({ dynamic: true })}`)
                .addFields(
                    {
                        name: "Current HP",
                        value: `${attackedUser.username}'s Ayanami's HP: ${health}/10 (-${damagetaken} HP)`,
                        inline: false
                    },
                    {
                        name: "Status",
                        value: `${status}`,
                        inline: false
                    }
                )
                .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

            return embed2
        }

        const attackedUser = message.mentions.users.first();
        if (attackedUser === undefined) return await message.channel.send("Commander, you need to specify who to attack!\nTip: Ping your target (e.g. @Ayanami)")
        if (attackedUser.id === "883727434602651649") return await message.channel.send("test")
        if (attackedUser.id === message.author.id) return await message.channel.send("Commander, please don't try to sink your own ships...")
        if (attackedUser.bot) return await message.channel.send("You can only attack players!");

        // Temporary Damage Randomiser
        let mindamagetaken = 1
        let maxdamagetaken = 4 - mindamagetaken
        let damagetaken = Math.floor(Math.random() * (maxdamagetaken)) + mindamagetaken

        const discordID = attackedUser.id
        
        var health = client.usercache.get(attackedUser.id).health - damagetaken
        if (health < 0) return await message.channel.send(`Commander, you cannot attack a sunken target`)
        users.addhealth(discordID, health, (err, result) => {
            if (err) return console.log(err)
            client.usercache.get(attackedUser.id).health = health
            console.log(client.usercache.get(attackedUser.id))
        })

        const torpedoStock = client.usercache.get(message.author.id).torpedoStock - 1
        users.addtorpedoStock(message.author.id, torpedoStock, (err, result) => {
            if (err) return console.log(err)
            client.usercache.get(message.author.id).torpedoStock = torpedoStock
            console.log(client.usercache.get(message.author.id).torpedoStock)
        })
        
        var status = health > 0 ? "Afloat" : "Sunk"

        if (status == "Sunk") return await message.channel.send({ embeds: [embedAtkFailed(message, health, status, damagetaken, attackedUser)]})
        else await message.channel.send({ embeds: [embedAtkSuccess(message, health, status, damagetaken, attackedUser)]})
    }
})