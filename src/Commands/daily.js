const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Emotes = require("../Data/emotes.json")
// const {
//     CoinEmote,
//     GemEmote
//  } = require("../Data/emotes.json")

module.exports = new Command({
    name: "daily",
    description: "Claim daily rewards!",
    permission: "SEND_MESSAGES",
    run: async (message, args, client, cache) => {

        // Daily Coins Generator
        let minCoins = 149
        let maxCoins = 401-minCoins
        let dCoins = Math.floor( Math.random() * (maxCoins)) + minCoins

        // Daily Gems Generator
        let minGems = 0
        let maxGems = 11-minGems
        let dGems = Math.floor( Math.random() *  (maxGems)) + minGems

        // Other Items

        const msg = await message.reply(`You have received ${dCoins} ${Emotes.Coins} and ${dGems} ${Emotes.Gems} as a daily reward!`);
        
    }
});