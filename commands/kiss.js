// Description: Kiss someone!
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('Kiss someone!')
		.addStringOption(option => option.setName('user').setDescription('The user to kiss!')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.username} kissed ${user}!`)
			.setImage('https://media.tenor.com/GAr1rMm39pcAAAAC/anime-hug.gif')
			.setColor('#FF0000');
		await interaction.reply({ embeds: [embed] });
	},
};