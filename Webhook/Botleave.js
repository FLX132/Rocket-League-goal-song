let urlPost = "https://discord.com/api/webhooks/1016789258205401119/fQT3D2lAp079e470lXfI6x46LXUKWhodfKR3hkrlSbkhcgonVKaLeptBruIllrmwet3W"

const { EmbedBuilder, WebhookClient } = require('discord.js');
const fs = require('fs');
const path = require('path');

const webhookClient = new WebhookClient({ url: urlPost });

let messageId = fs.readFileSync(path.join(__dirname, "..", "properties", "messageID.txt"), 'utf8');
console.log(messageId);

webhookClient.editMessage(messageId, {
	content: "messageContent",
	username: "user",
	avatarURL: "avatar",
});
