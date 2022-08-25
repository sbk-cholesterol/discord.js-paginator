const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const token = "your_bot_token";
const paginator = require("./util/paginator");
require("colors");
const intents = [
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.Guilds,
];
console.clear();
const client = new Client({
  intents: intents,
});

client.on("messageCreate", async (message) => {
  if (message.content === `!embeds`) {
    let embeds = [];
    const embed1 = new EmbedBuilder().setDescription(`Page 1`);
    const embed2 = new EmbedBuilder().setDescription(`Page 2`);
    const embed3 = new EmbedBuilder().setDescription(`Page 3`);
    embeds.push(embed1, embed2, embed3);
    let currentPage = 0;
    const response = await message.reply({
      embeds: [embeds[currentPage]],
      components: [paginator(currentPage, embeds)],
    });
    const collector = response.createMessageComponentCollector({
      idle: 15000,
    });
    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();
      if (interaction.user.id !== message.author.id) {
        return interaction.followUp({
          content: "This button is not for you",
          ephemeral: true,
        });
      }
      switch (interaction.customId) {
        case "pagePrevious":
          {
            currentPage--;
            response.edit({
              embeds: [embeds[currentPage]],
              components: [paginator(currentPage, embeds)],
            });
          }
          break;
        case "pageNext":
          {
            currentPage++;
            response.edit({
              embeds: [embeds[currentPage]],
              components: [paginator(currentPage, embeds)],
            });
          }
          break;
      }
    });
    collector.on("end", async () => {
      response.edit({
        components: [],
      });
    });
  }
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`.green);
});

client.login(token);
