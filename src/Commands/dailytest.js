const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");
const users = require("../Model/DatabaseFunctions/users");


module.exports = new Command({
    name: "daily",
    description: "Claim daily rewards!",
    permission: "SEND_MESSAGES",
    run: async (message, args, client, cache) => {
        console.log(cache)
        const usercache = cache.users
       
        // Daily Coins Generator
        let minCoins = 149
        let maxCoins = 401 - minCoins
        let dCoins = Math.floor(Math.random() * (maxCoins)) + minCoins

        // Daily Gems Generator
        let minGems = 0
        let maxGems = 11 - minGems
        let dGems = Math.floor(Math.random() * (maxGems)) + minGems

        // Other Items

        const discordID = message.author.id

        const nextdailyTime = (parseInt(usercache.get(message.author.id).lastDaily) + 82800000).toString()
        if (Date.now() < nextdailyTime) return message.reply(`Commander, you can only use this command <t:${nextdailyTime.slice(0, -3)}:R>`)
        const lastDaily = Date.now()
        users.addlastDaily(discordID, lastDaily, (err, result) => {
            if (err) return console.log(err)
        })

        const coins = usercache.get(message.author.id).coins + dCoins
        users.addCoins(discordID, coins, (err, result) => {
            if (err) return console.log(err)
            usercache.get(message.author.id).coins = coins
            console.log(usercache.get(message.author.id))
        })


        const gems = usercache.get(message.author.id).gems + dGems
        users.addGems(discordID, gems, (err, result) => {
            if (err) return console.log(err)
            usercache.get(message.author.id).gems = gems
            console.log(usercache.get(message.author.id))
        })


        const dailyStreak = usercache.get(message.author.id).dailyStreak + 1
        users.adddailyStreak(discordID, dailyStreak, (err, result) => {
            if (err) return console.log(err)
        })

        const msg = await message.reply(`You have received ${dCoins} ${Emotes.Coins} and ${dGems} ${Emotes.Gems} as a daily reward!`);

    }
});