const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Update the bot\'s presence')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand(subcommand =>
			subcommand.setName('activity')
				.setDescription('Update the bot\'s activity')
				.addStringOption(option =>
					option.setName('type')
						.setDescription('Pick an activity')
						.setRequired(true)
						.addChoices(
							{ name: 'Playing', value: 'Playing' },
							{ name: 'Streaming', value: 'Streaming' },
							{ name: 'Listening', value: 'Listening' },
							{ name: 'Watching', value: 'Watching' },
							{ name: 'Competing', value: 'Competing' }))
				.addStringOption(option =>
					option.setName('activity')
						.setDescription('Set your current activity')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName('status')
				.setDescription('Update the bot\'s status')
				.addStringOption(option =>
					option.setName('type')
						.setDescription('Pick a status')
						.setRequired(true)
						.addChoices(
							{ name: 'Online', value: 'online' },
							{ name: 'Idle', value: 'idle' },
							{ name: 'Do Not Disturb', value: 'dnd' },
							{ name: 'Invisible', value: 'invisible' }))),
	async execute(interaction) {
		const { options } = interaction;
		const sub = options.getSubcommand(['activity', 'status']);
		const type = options.getString('type');

		try {
			switch (sub) {
			case 'activity':
				switch (type) {
				case 'Playing':
					client.user.setActivity(activity, { type: ActivityType.Playing });
					break;
				case 'Streaming':
					client.user.setActivity(activity, { type: ActivityType.Playing });
					break;
				case 'Listening':
					client.user.setActivity(activity, { type: ActivityType.Listening });
					break;
				case 'Watching':
					client.user.setActivity(activity, { type: ActivityType.Watching });
					break;
				case 'Competing':
					client.user.setActivity(activity, { type: ActivityType.Competing });
					break;
				}
				break;
			case 'status':
				client.user.setPresence({ status: type });
				break;
			}

		}
		catch (error) {
			console.error(error);
		}
		return interaction.reply({ content: 'Successfully updated the bot\'s presence!', ephemeral: true });
	},

};

