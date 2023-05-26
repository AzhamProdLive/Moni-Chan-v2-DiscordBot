const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Displays user avatar')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to display the avatar of')
				.setRequired(false)),

	async execute(interaction) {
		const user = interaction.options.getUser('user') || interaction.user;
		const avatarEmbed = new EmbedBuilder().addFields([
			{ name: 'Avatar', value: `[Click here](${user.displayAvatarURL({ dynamic: false })})` },
			{ name: 'Avatar URL', value: user.displayAvatarURL({ dynamic: true }) }],
		);
		await interaction.reply({ embeds: [avatarEmbed] });
	},
};
