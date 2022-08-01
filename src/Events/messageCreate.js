const Event = require("../Structures/Event.js");
const Discord = require("discord.js")
const users = require("../Model/DatabaseFunctions/users")

userCache = new Discord.Collection()
// gachaCache = Discord.Collection()

users.getData((error, result) => {
    error ? console.log(error) : result.forEach(user => { userCache.set((user.discordID), { coins: user.coins, gems: user.gems, lastDaily: user.lastDaily, dailyStreak: user.dailyStreak, torpedoStock: user.torpedoStock, currentShip: user.currentShip, health: user.health }); })
})

// gacha.getData()...
const cache = { users: userCache }

module.exports = new Event("messageCreate", async (client, message) => {
    if (message.author.bot) return;
    if (userCache.get(message.author.id) == undefined) {

        const discordID = message.author.id
        const coins = 0
        const gems = 0
        const lastDaily = 0
        const dailyStreak = 0
        const torpedoStock = 0
        const currentShip = 0
        const health = 0

        users.addUser(discordID, coins, gems, lastDaily, dailyStreak, torpedoStock, currentShip, health, (err, result) => {
            err ? console.log(err) : userCache.set((discordID), { coins: coins, gems: gems, lastDaily: lastDaily, dailyStreak: dailyStreak, torpedoStock: torpedoStock, currentShip: currentShip, health: health })
        })
    }

    if (message.content == "hello") await message.channel.send("Konnichiwa!");
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (message.author.id === "272692741316804609" && args[0] === 'clientrestart') return message.channel.send(`**Restarting client :)**`).then(() => { process.exit() })

    if (!command) return await message.reply("That isn't a valid command!");

    const permission = message.member.permissions.has(command.permission, true);

    if (!permission) return await message.reply(`Hmm...Seems like you do not have the permission \${command.permission}\ and can't use this command!`);

    command.run(message, args, client, cache, cache);

    // switch (args[0]) {
    //     case "hello":
    //         return await message.channel.send("Konnichiwa!");

    //         break;

    //     case "say":
    //         return await message.channel.send(args.slice(1).join(" "));

    //         break;

    //     default:
    //         break;
    // }
});
