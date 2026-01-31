import { imgGenerator } from "@pkg/utils/dice/image-generation";
import { roll } from "@pkg/utils/dice/roll";
import {
  AttachmentBuilder,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { createBotCommand } from "#core/commands";

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
  const img = imgGenerator(result);
  const att = new AttachmentBuilder(img, { name: "result.png" });
  const window = new EmbedBuilder()
    .setColor("DarkPurple")
    .setTitle(`🎲 ${xp}`)
    .setImage("attachment://result.png");
  await interaction.reply({
    embeds: [window],
    files: [att],
    flags: hidden ? ["Ephemeral"] : [],
  });
}

createBotCommand({ data, execute });
