const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmute a user.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to unmute.').setRequired(true)),

	async execute(interaction) {
		const { guild, options } = interaction;

		const user = options.getUser('user');
		const member = guild.members.cache.get(user.id);

		const errEmbed = new EmbedBuilder()
			.setDescription(`There was an error trying to unmute ${user}!`)
			.setColor('#ff0000');

		const successEmbed = new EmbedBuilder()
			.setTitle('**:white_check_mark: Success!**')
			.setDescription(`${user} has been unmuted!`)
			.setColor('#00ff00')
			.setTimestamp();

		if (member.roles.highest.position >= interaction.member.roles.highest.position) {
			return interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}

		if (interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
			return interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}

		try {
			await member.timeout(null);
			await interaction.reply({ embeds: [successEmbed], ephemeral: false });
		}
		catch (err) {
			console.error(err);
		}
	},
};