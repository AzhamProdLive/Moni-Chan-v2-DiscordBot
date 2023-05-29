const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { hyperlink } = require('discord.js');
const cpuStat = require('cpu-stat');
const url = 'https://discord.gg/XKs9YUXdbE';
const link = hyperlink('Support Server !', url);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows the stats of the bot'),
	execute(interaction) {
		cpuStat.usagePercent(function(err) {
			if (err) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

			const embed = new EmbedBuilder()
				.setTitle('Bot Stats')
				.setColor('#31d668')
				.addFields(
					{ name: 'Server Count', value: `${interaction.client.guilds.cache.size}`, inline: true },
					{ name: 'Uptime', value: `${Math.floor(process.uptime() / 3600)} hours, ${Math.floor((process.uptime() / 60) / 60)} minutes, ${Math.floor(process.uptime() % 60)} seconds`, inline: true },
					{ name: 'RAM Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
					{ name: 'CPU Usage', value: `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`, inline: true },
					{ name: 'Operating System', value: 'Arch Linux', inline: true },
					{ name: 'Node.js Version', value: `${process.version}`, inline: true },
					{ name: 'Discord.js Version', value: `v${require('discord.js').version}`, inline: true },
					{ name: 'Developer', value: 'Maximus Decimus#3263 & DJMayJay#2001', inline: true },
					{ name: 'Bot Ping', value: (interaction.client.ws.ping) + 'ms', inline: true },
					{ name: 'Bot Server', value: link, inline: true },
				)
				.setFooter({ text: 'Made by Maximus Decimus#3263' })
				.setTimestamp();
			interaction.reply({ embeds: [embed] });
		});
	},
};

