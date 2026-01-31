import { sign } from "@pkg/utils/encrypt/sheet-token";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { createBotCommand } from "#core/commands";
import { ENV } from "#env";

const data = new SlashCommandBuilder().setName("join").setDescription("Join current campaign");

async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const token = sign(
    `${interaction.user.id}:${interaction.channelId}`,
    ENV.SHEET_TOKEN_SECRET,
    ENV.SHEET_TOKEN_EXPIRATION,
  );
  const url = `${ENV.URL_SHEET}/?token=${token}`;
  const embed = new EmbedBuilder().setTitle("To create your character, use the following link:");
  const button = new ButtonBuilder()
    .setLabel("Create Character")
    .setStyle(ButtonStyle.Link)
    .setURL(url);
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
  await interaction.reply({
    embeds: [embed],
    components: [row],
    flags: [MessageFlags.Ephemeral],
  });
}

createBotCommand({ data, execute });
