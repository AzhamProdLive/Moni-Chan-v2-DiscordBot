const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption(option => option.setName('userid').setDescription('The ID to the user you want to unban').setRequired(true)),

	async execute(interaction) {
		const { channel, options } = interaction;
		const userid = options.getUser('userid');

		try {
			await interaction.guild.members.unban(userid);
			return interaction.reply({ content:`Successfully unbanned ${userid}`, ephemeral: false });
		}
		catch (error) {
			console.error(error);
			return interaction.reply({ content:`Failed to unban ${userid}`, ephemeral: true });

		}
	},

};