const { EmbedBuilder, SlashCommandBuilder, PermissionsFlagsBits, VoiceChannel, GuildEmoji } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('Make me sing a song !')
		.addSubcommand(subcommand =>
			subcommand.setName('play')
				.setDescription('Play a song')
				.addStringOption(option =>
					option.setName('query')
						.setDescription('Give me the song you want to me to sing~!')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName('options')
				.setDescription('Set the options of the music player')
				.addStringOption(option =>
					option.setName('option')
						.setDescription('Select an option')
						.setRequired(true)
						.addChoices(
							{ name: 'queue', value: 'queue' },
							{ name: 'skip', value: 'skip' },
							{ name: 'pause', value: 'pause' },
							{ name: 'resume', value: 'resume' },
							{ name: 'stop', value: 'stop' },
						),
				),
		),
	async execute(interaction) {
		const { options, member, guild, channel } = interaction;
		const subcommand = options.getSubcommand();
		const query = options.getString('query');
		const option = options.getString('option');
		const voiceChannel = member.voice.channel;
		const embed = new EmbedBuilder();

		if (!voiceChannel) {
			embed.setTitle('You are not in a voice channel!');
			embed.setColor('Red');
			return interaction.reply({ embeds: [embed] });
		}

		if (!member.voice.channelId == guild.member.me.voice.channelId) {
			embed.setTitle('I\'m already in a voice channel!');
			embed.setColor('Red');
			return interaction.reply({ embeds: [embed] });
		}

		try {
			switch (subcommand) {
			case 'play':
				interaction.client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
				return interaction.reply({ content: `🎵 Playing ${query}! 🎵` });
			case 'options':
				const queue = await interaction.client.distube.getQueue(voiceChannel);

				if (!queue) {
					embed.setTitle('There is no music playing!');
					embed.setColor('Red');
					return interaction.reply({ embeds: [embed] });
				}
				switch (option) {
				case 'skip':
					interaction.client.distube.skip(voiceChannel);
					return interaction.reply({ content: '⏭ Skipped the current song!' });
				case 'stop':
					interaction.client.distube.stop(voiceChannel);
					return interaction.reply({ content: '⏹ Stopped the music!' });
				case 'pause':
					interaction.client.distube.pause(voiceChannel);
					return interaction.reply({ content: '⏸ Paused the music!' });
				case 'resume':
					interaction.client.distube.resume(voiceChannel);
					return interaction.reply({ content: '▶️ Resumed the music!' });
				case 'queue':
					embed.setColor('Purple').setDescription(
						`Current Queue:\n${queue.songs.map((song, id) =>
							`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``,
						).join('\n')}\n\nVolume: ${queue.volume}%`,
					);
					return interaction.reply({ embeds: [embed] },
					);


				}

			}
		}
		catch (err) {
			console.error(err);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: false });
		}
	},


};