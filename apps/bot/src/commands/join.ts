import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createBotCommand } from "#core/commands";

const data = new SlashCommandBuilder().setName("join").setDescription("Join current campaign");

async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  console.log(interaction.channelId, interaction.user.id);
  await interaction.reply("Pong!");
}

createBotCommand({ data, execute });
