// Desc: Picks a random item from a given list
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randompick')
		.setDescription('Picks a random item from a given list')
		.addStringOption(option =>
			option.setName('list')
				.setDescription('The list of items to pick from')
				.setRequired(true)),
	async execute(interaction) {
		const list = interaction.options.getString('list');
		const listArray = list.split(',');
		const randomPick = Math.floor(Math.random() * listArray.length);
		await interaction.reply(`I picked ${listArray[randomPick]}!`);
	},
};