// Desc: Make Moni-Chan say something!
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('monisays')
		.setDescription('Make Moni-Chan say something!')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back')),
	async execute(interaction) {
		const value = interaction.options.getString('input');
		if (value) return interaction.channel.send(`${value}`);
		return interaction.reply('No option was provided!');
	},
};
