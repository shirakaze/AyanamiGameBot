const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
    name: "commands",
    description: "Display a list of Commands",
    permission: "SEND_MESSAGES",
    async run(message, args, client, cache) {
        
        const embed = new Discord.MessageEmbed();

        embed.setTitle("List of Commands")
            .setColor("00E8FF")
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic : true}))
            .setDescription("This is a list of commands that Ayanami can execute as of 26/7/2022\nCommands:")
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: "commands",
                    value: "Displays this list.",
                    inline: false
                },
                {
                    name: "ping",
                    value: "Sends a message and displays ping.",
                    inline: false
                },
                {
                    name: "daily",
                    value: "Claim your daily rewards. Has a 23h cooldown.",
                    inline: false
                },
                {
                    name: "attack",
                    value: "Attack another player.",
                    inline: false
                },
                {
                    name: "load",
                    value: "Loads a Torpedo.",
                    inline: false
                },
                {
                    name: "dock",
                    value: "Return your ship to your Port",
                    inline: false
                }
            )
            .setFooter("Mission Complete, yes")

        message.reply({ embeds: [embed] })
    }
})