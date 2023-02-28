const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user from the server.')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The member to kick')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for kicking the member')),
	execute: async function(interaction) {
		const { channel, options } = interaction;
		const user = options.getUser('target');
		const reason = options.getString('reason');
		const member = await interaction.guild.members.fetch(user.id);
		const errEmbed = new EmbedBuilder()
			.setDescription('You do not have permission to kick this user, since they have a higher role!')
			.setColor(0xff0000);
		if (member.roles.highest.position >= interaction.member.roles.highest.position) {
			return interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}
		await member.kick(reason);

		const embed = new EmbedBuilder()
			.setDescription(`Successfully kicked ${user} from the server for the following reason : ${reason}!`)
			.setColor(0x00ff00);
		await interaction.reply({ embeds: [embed] });
	},
};

