import { type ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createBotCommand } from "#core/commands";
import { roll } from "#util/rolldice";

const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("rolamento de dados ex: 2d20")
  .addStringOption((option) =>
    option
      .setName("xp")
      .setDescription("expressao de rolamento de dado! ex: 2d6")
      .setRequired(true),
  );

async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const xp = interaction.options.getString("xp", true);
  const hidden = xp.endsWith("!");
  const result = roll(xp.replace("!", ""));
  if (result === false) {
    await interaction.reply({
      content: `Expressao invalida: ${xp}`,
      flags: ["Ephemeral"],
    });
    return;
  }
  const window = new EmbedBuilder()
    .setColor("DarkPurple")
    .setTitle(`🎲 ${xp}`)
    .setDescription(`<@${interaction.user.id}> rolou ${result.total} (${result.values.join(",")})`);
  await interaction.reply({ embeds: [window], flags: hidden ? ["Ephemeral"] : [] });
}

createBotCommand({ data, execute });
