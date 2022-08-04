const Discord = require("discord.js");
const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");
const users = require("./Model/DatabaseFunctions/users");

const client = new Client();

client.usercache = new Discord.Collection()

// gachaCache = Discord.Collection()

// gacha.getData()...
users.getData((error, result) => {
    error ? console.log(error) : result.forEach(user => { client.usercache.set((user.discordID), { coins: user.coins, gems: user.gems, lastDaily: user.lastDaily, dailyStreak: user.dailyStreak, torpedoStock: user.torpedoStock, currentShip: user.currentShip, health: user.health }); })
})

client.commands = new Discord.Collection();

client.start(config.token);