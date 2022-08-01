const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json");
const users = require("../Model/DatabaseFunctions/users");
// const {
//     CoinEmote,
//     GemEmote
//  } = require("../Data/emotes.json")

module.exports = new Command({
    name: "dailytest",
    description: "Claim daily rewards!",
    permission: "SEND_MESSAGES",
    run: async (message, args, client, cache) => {
        console.log(cache)
        const usercache = cache.users
        var savedData = {}
        // const username = message.author.username
        // const discordID = message.author.id
        // const coins = 0
        // const gems = 0
        // const lastDaily = 0
        // const dailyStreak = 0
        // const torpedoStock = 0
        // const currentShip = 0
        // const health = 0
        // users.addUser(discordID , coins, gems, lastDaily, dailyStreak, torpedoStock, currentShip, health, (err, result) => {
        //     return err ? console.log(err) : ""
        // })

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

        await users.getlastDaily(discordID, (err, result) => {
            if (err) return console.log(err)
            const nextdailyTime = (parseInt(result[0].lastDaily) + 82800000).toString()
            if (Date.now() < nextdailyTime) return message.reply(`Commander, you can only use this command <t:${nextdailyTime.slice(0, -3)}:R>`)
            const lastDaily = Date.now()
            users.addlastDaily(discordID, lastDaily, (err, result) => {
                if (err) return console.log(err)
            })
        })

        const coins = dCoins
        users.getcoins(discordID, (err, result) => {
            if (err) return console.log(err)
            const coins = result[0].coins + dCoins
            users.addCoins(discordID, coins, (err, result) => {
                if (err) return console.log(err)
            })
        })

        users.getgems(discordID, (err, result) => {
            if (err) return console.log(err)
            const gems = result[0].gems + dGems
            users.addGems(discordID, gems, (err, result) => {
                if (err) return console.log(err)
            })
        })
        
        const dailyStreak = usercache.find(u => u.discordID == message.author.id).dailyStreak + 1
        console.log(dailyStreak)
        users.adddailyStreak(discordID, dailyStreak, (err, result) => {
            if (err) return console.log(err)
        })

        const msg = await message.reply(`You have received ${dCoins} ${Emotes.Coins} and ${dGems} ${Emotes.Gems} as a daily reward!`);

    }
});