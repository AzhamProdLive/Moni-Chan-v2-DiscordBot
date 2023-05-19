// Desc: Rolls a dice
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Rolls a dice')
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('The number of sides the dice has')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('The number of dice to roll')
				.setRequired(true)),
	async execute(interaction) {
		const sides = interaction.options.getInteger('sides');
		const amount = interaction.options.getInteger('amount');
		let diceRoll = '';
		for (let i = 0; i < amount; i++) {
			diceRoll += `${Math.floor(Math.random() * sides) + 1} `;
		}
		return interaction.reply(`You rolled ${diceRoll}!`);
	},
};