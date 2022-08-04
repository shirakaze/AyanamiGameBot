const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");

module.exports = new Command({
    name: "attack",
    description: "Attacks a target",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        
        const embed = new Discord.MessageEmbed();
        const attackedUser = message.mentions.users.first();
        if (attackedUser.id === undefined) return await message.channel.send("Commander, you need to specify a who to attack")
        if (attackedUser.id === "883727434602651649") return await message.channel.send("test")
        if (attackedUser.id === message.author.id) return await message.channel.send("Commander, please don't try to sink your own ships...")
        if (attackedUser.bot) return await message.channel.send("You can only attack players!");

        embed.setTitle("Attack Result")
            // .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setColor('#6c42f5')
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic : true}))
            // .setDescription(`${ attackedUser } has been hit for 1 damage!`)
            .setDescription(`[insert emoji for hp bar]`)
            .setTimestamp(message.createdTimestamp)
            .setImage('https://azurlane.netojuu.com/images/0/08/AyanamiChibi.png')
            .setThumbnail(`${attackedUser.avatarURL({ dynamic: true })}`)
            .addFields(
                {
                    name: "Current HP",
                    value: `${attackedUser.username}'s Ayanami's HP: 10/10 (-0 HP)`,
                    inline: false
                }
            )
            .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        message.channel.send({ embeds: [embed] });
    }
})