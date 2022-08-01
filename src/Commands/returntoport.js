// 'use-strict'
const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = new Command({
    name: "dock",
    description: "Return your ship to port",
    permission: "SEND_MESSAGES",
    run: async (message, args, client, cache) => {

        const author = message.author

        const row = new MessageActionRow()
            .addComponents(
                // (
                new MessageButton()
                    .setCustomId('Confirm')
                    .setLabel('Yes')
                    .setStyle('SUCCESS'),
                // .setEmoji('✅'),
                new MessageButton()
                    .setCustomId('Cancel')
                    .setLabel('No')
                    .setStyle('DANGER')
                // .setEmoji('❌')
            )

        const msg = await message.reply({ content: "Return to port?", components: [row] }).then(message => {

            const collector = message.createMessageComponentCollector({
                componentType: 'BUTTON',
                filter: ({ user }) => user.id === author.id,
                time: 30000,
                limit: 1,
                dispose: true
            })

            collector.on('collect', async button => {
                console.log(`1`)
                if (button.customId === 'Confirm') {
                    console.log(`2`)
                    await message.edit({ content: 'Returning to port...' });
                    // Error over here
                    setTimeout(async() => {
                        
                        await message.edit({ content: "Arrived at Port" }).then(() => {
                            return true
                        }).catch(err => {
                            console.log(err)
                            return message.channel.send({ content: "This doesn't seem to work in IRL battles..." })
                        })
                    }, 3000);

                }
                if (button.customId === 'Cancel') {
                    console.log(`3`)
                    await message.edit({ content: 'Cancelling Action...' });
                    setTimeout(async() => {
                        await message.edit({ content: `Continuting Sortie` }).then(() => {
                            return true
                        }).catch(err => {
                            console.log(err)
                            return message.channel.send({ content: "This doesn't seem to work in IRL battles..."})
                        })
                    }, 3000)
                }

            })

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
                console.log(`4`);
                return
            })

            console.log(`=== [DEBUGGING teSt eND Of COMMAND] ===`)

        })
    }
})