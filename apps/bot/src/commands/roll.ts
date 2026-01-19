import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
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
  const result = roll(xp);
  if (result === false) {
    await interaction.reply({
      content: `Expressao invalida: ${xp}`,
      flags: ["Ephemeral"],
    });
    return;
  }

  await interaction.reply(`Seu ${xp} = ${result.total} (${result.values.join(", ")})`);
}

createBotCommand({ data, execute });
