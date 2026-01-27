import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createBotCommand } from "#core/commands";
import { ENV } from "#env";

const data = new SlashCommandBuilder()
  .setName("start_campaign")
  .setDescription("inicia uma campanha de rpg")
  .addStringOption((option) =>
    option.setName("name").setDescription("digite o nome da sua campanha").setRequired(true),
  );

async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!(interaction.inGuild() && interaction.channel)) {
    await interaction.reply({
      content: "Não é possivel criar uma campanha aqui",
      flags: ["Ephemeral"],
    });
    return;
  }
  const { channel } = interaction;
  if (channel.parent?.name !== ENV.CATEGORY) {
    await interaction.reply({
      content: `Este canal nao pode estar fora da categoria ${ENV.CATEGORY}`,
      flags: ["Ephemeral"],
    });
    return;
  }
  const url = `${ENV.URL_API}/campaigns`;
  const name = interaction.options.getString("name", true);
  const { channelId } = interaction;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ name, id: channelId }),
    });

    const data = await response.json();

    await channel.setName(`✅${name}`);

    await interaction.reply({
      content: response.ok ? "FOI!!!" : data.message,
      flags: ["Ephemeral"],
    });
  } catch (error) {
    await interaction.reply({
      content: (error as Error).message,
      flags: ["Ephemeral"],
    });
  }
}

createBotCommand({ data, execute });
