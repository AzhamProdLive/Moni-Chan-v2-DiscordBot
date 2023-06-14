// Description: Pat someone!
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pat')
		.setDescription('Pat someone!')
		.addUserOption(option => option.setName('user').setDescription('The user to pat!')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.username} patted ${user.username}!`)
			.setImage('https://media.discordapp.net/attachments/982114303702335518/1060657006630928498/image1.gif')
			.setColor('#FF0000');
		await interaction.reply({ embeds: [embed] });
	},
};