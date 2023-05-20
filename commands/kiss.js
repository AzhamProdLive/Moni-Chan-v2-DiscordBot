// Description: Kiss someone!
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('Kiss someone!')
		.addUserOption(option => option.setName('user').setDescription('The user to kiss!')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.username} kissed ${user.username}!`)
			.setImage('https://tenor.com/view/anime-hug-kiss-cheek-kiss-chuu-gif-25299966')
			.setColor('#FF0000');
		await interaction.reply({ embeds: [embed] });
	},
};