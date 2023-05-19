// Desc: Flips a coin
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flips a coin')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('The number of times to flip the coin')
				.setRequired(true)),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		let heads = 0;
		let tails = 0;
		for (let i = 0; i < amount; i++) {
			const coinFlip = Math.floor(Math.random() * 2) + 1;
			if (coinFlip == 1) {
				heads++;
			}
			else {
				tails++;
			}
		}
		await interaction.reply(`You flipped ${heads} heads and ${tails} tails!`);
	},
};