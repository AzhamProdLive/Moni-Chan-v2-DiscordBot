const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	'data': new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Provides information about the user.')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user\'s information you want to view')
				.setRequired(false),
		),
	async execute(interaction) {
		const { options } = interaction;
		const user = interaction.options.getUser('target') || interaction.user;
		const member = interaction.guild.members.cache.get(user.id);
		const icon = user.displayAvatarURL();
		const tag = user.tag;
		const userEmbed = new EmbedBuilder()
			.setColor('Blue')
			.setAuthor({ name: tag, iconURL: icon })
			.addFields([
				{ name: 'Username', value: `${user}`, inline: false },
				{ name: 'Roles', value: `${member.roles.cache.map(r => r).join('')}`, inline: false },
				{ name: 'ID', value: user.id, inline: true },
				{ name: 'Nickname', value: member.nickname || 'None', inline: true },
				{ name: 'Joined Server', value: `<t:{parseInt(member.user.joinedAt / 1000)}:R>`, inline: true },
				{ name: 'Joined Discord', value: `<t:{parseInt(member.user.createdAt / 1000}:R>`, inline: true },
			])
			.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		await interaction.reply({ embeds: [userEmbed] });
	},
};
