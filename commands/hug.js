// Description: Sends a hug gif to the user.
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const randomhugs = [
	'https://media.discordapp.net/attachments/930207359232512060/999396292243509368/MonikaHug2.gif',
	'https://media.tenor.com/yz_nVDTQ-TgAAAAd/monika-ddlc.gif',
	'https://media.tenor.com/s_voIurxH_MAAAAC/ddlc-monika.gif'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone!')
		.addUserOption(option => option.setName('user').setDescription('The user to hug!')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.username} hugged ${user.username}!`)
			.setImage(randomhugs[Math.floor(Math.random() * randomhugs.length)])
			.setColor('#31d668');
		await interaction.reply({ embeds: [embed] });
	},
};
