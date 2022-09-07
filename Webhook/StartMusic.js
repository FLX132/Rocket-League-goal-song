let urlPost = "https://discord.com/api/webhooks/1016789258205401119/fQT3D2lAp079e470lXfI6x46LXUKWhodfKR3hkrlSbkhcgonVKaLeptBruIllrmwet3W"

const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({ url: urlPost });

const embed = new EmbedBuilder()
	.setTitle('Some Title')
	.setColor(0x00FFFF);

webhookClient.send({
	content: 'Webhook test',
	username: 'some-username',
	avatarURL: 'https://i.imgur.com/AfFp7pu.png',
	embeds: [embed],
});
