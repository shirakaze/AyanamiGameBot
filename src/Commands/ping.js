const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "ping",
    description: "Get your ping from Ayanami!",
    permission: "SEND_MESSAGES",
    run: async (message, args, client, cache) => {
        const msg = await message.reply(`They're ears, not horns... Ping: ${client.ws.ping} ms.`);
        msg.edit(`	Ayanami here. Successfully infiltrated Commander's office. Oh... Commander saw me. Operation failed...\nPing: ${client.ws.ping} ms. \nMessage Ping: ${msg.createdTimestamp - message.createdTimestamp} ms.`);

    }

    // async run(message, args, client, cache) {
    //     const msg = await message.reply(`Ah, hey! Ping: ${client.ws.ping} ms.`);
        
    //     msg.edit(`Ah, hey! Ping: ${client.ws.ping} ms. \nMessage Ping: ${msg.createdTimestamp - message.createdTimestamp} ms.`);
    // }
});
// hi