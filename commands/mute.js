const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ms = require ('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute a user for a specified amount of time.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to timeout.').setRequired(true))
		.addStringOption(option =>
			option.setName('duration')
				.setDescription('The duration of the timeout.').setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for the timeout.').setRequired(true)),

	async execute(interaction) {
		const { guild, options } = interaction;
		const user = options.getUser('user');
		const member = guild.members.cache.get(user.id);
		const duration = options.getString('duration');
		const convertedDuration = ms(duration);
		const reason = options.getString('reason');

		const errEmbed = new EmbedBuilder()
			.setDescription(`There was an error trying to mute ${user}!`)
			.setColor('#ff0000');

		const successEmbed = new EmbedBuilder()
			.setTitle('**:white_check_mark: Success!**')
			.setDescription(`${user} has been muted!`)
			.addFields(
				{ name: 'Duration', value: `${duration}`, inline: true },
				{ name: 'Reason', value: `${reason}`, inline: true })
			.setColor('#00ff00')
			.setTimestamp();

		if (member.roles.highest.position > interaction.member.roles.highest.position) {
			return interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}

		if (interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
			return interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}

		if (!convertedDuration) {
			return interaction.reply({ content: 'Please enter a valid duration, dummy !', ephemeral: true });
		}

		try {
			await member.timeout({ duration: convertedDuration, reason: reason });
			await interaction.reply({ embeds: [successEmbed], ephemeral: false });
		}
		catch (err) {
			console.error(err);
		}
	},


};
