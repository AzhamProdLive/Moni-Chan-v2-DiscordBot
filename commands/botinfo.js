const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const os = require('os');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows the stats of the bot'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('Bot Stats')
			.addFields(
				{ name: 'Server Count', value: `${interaction.client.guilds.cache.size}`, inline: true },
				{ name: 'Uptime', value: `${ms(interaction.client.uptime)}`, inline: true },
				{ name: 'RAM Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
				{ name: 'CPU Usage', value: `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`, inline: true },
				{ name: 'Operating System', value: `${os.platform()}`, inline: true },
				{ name: 'Node.js Version', value: `${process.version}`, inline: true },
				{ name: 'Discord.js Version', value: `v${require('discord.js').version}`, inline: true },
			)
			.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};