const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption(option => option.setName('target').setDescription('The user to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for banning the user')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason');
		const member = await interaction.guild.members.fetch(user.id);
		if (user === interaction.user) {
			return interaction.reply({ content: 'You cannot ban yourself, silly!', ephemeral: true });
		}
		else if (user === interaction.client.user) {
			return interaction.reply({ content: 'You cannot ban me, silly!', ephemeral: true });
		}
		if (member.bannable) {
			await member.ban({ reason: reason });
			return interaction.reply({ content: `${user.username}.chr has been deleted. (${user.username} has been banned for the following reason : ${reason}.`, ephemeral: false });
		}
		else {
			return interaction.reply({ content: `I can't ban ${user.username}, check if they have an higher role than you and me !`, ephemeral: true });
		}
	},

};