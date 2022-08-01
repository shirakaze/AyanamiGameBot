const Discord = require("discord.js");
const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");

const client = new Client();

client.commands = new Discord.Collection();

client.start(config.token);