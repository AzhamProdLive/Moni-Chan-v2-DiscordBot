const { SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require('discord.js');

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
						.addChoices({ name: 'Playing', value: 'Playing' },
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
		const activity = options.getString('activity');

		try {
			switch (sub) {
			case 'activity':
				switch (type) {
				case 'Playing':
					interaction.client.user.setActivity(activity, { type: ActivityType.Playing });
					break;
				case 'Streaming':
					interaction.client.user.setActivity(activity, { type: ActivityType.Playing });
					break;
				case 'Listening':
					interaction.client.user.setActivity(activity, { type: ActivityType.Listening });
					break;
				case 'Watching':
					interaction.client.user.setActivity(activity, { type: ActivityType.Watching });
					break;
				case 'Competing':
					interaction.client.user.setActivity(activity, { type: ActivityType.Competing });
					break;
				}
				break;
			case 'status':
				interaction.client.user.setPresence({ status: type });
				break;
			}

		}
		catch (error) {
			console.log(error);
		}
		return interaction.reply({ content: 'Successfully updated the bot\'s presence!', ephemeral: true });
	},

};

