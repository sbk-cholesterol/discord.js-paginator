const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
require("colors");
/**
 * @param {Number} currentPage
 * @param {Array} embeds
 */

module.exports = (currentPage, embeds) => {
  const paginator = new ActionRowBuilder();

  paginator.addComponents(
    new ButtonBuilder()
      .setCustomId("pagePrevious")
      .setLabel("⬅️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage === 0) // checks if the page is the first one
  );

  paginator.addComponents(
    new ButtonBuilder()
      .setCustomId("pageNext")
      .setLabel("➡️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage === embeds.length - 1) // checks if the page is the last one
  );

  return paginator;
};
