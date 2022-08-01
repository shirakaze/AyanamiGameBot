const Event = require("../Structures/Event.js");

module.exports = new Event("ready", (client) => {
    console.log(`Ayanami is logged in as ${client.user.tag}`);
    client.user.setActivity({ type: "PLAYING", name: "Ayanami is currently under construction", status: `dnd`})
});

// module.exports = class ReadyEvent extends Event {
//     constructor() {
//         super('ready');
//     }
//     async run (client) {
//         let serverIn = await client.guilds.cache.size;
//         console.log(`Ayano is logged in as ${client.user.tag}`);
//         client.user.setPresence({ activities: [{ name: "Those secret agents, I wonder if I have become their 'big sister' now?" }], type: "WATCHING", status: 'online' })
//         .catch(console.error);
//     }
        
// };