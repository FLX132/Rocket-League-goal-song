const Discord = require('discord.js');
const { joinVoiceChannel, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, DiscordStream } = require('@discordjs/voice');
const { join } = require('node:path');
const path = require('path');
const { generateDependencyReport } = require('@discordjs/voice');

const client = new Discord.Client({ intents:  131071  });
client.login('');

let channel;
let connection;
let dirname = __dirname + '\\audio';
const player = createAudioPlayer();
let resourceTor = createAudioResource(path.join(__dirname, './audio/FCN-Torhymne.mp3'), { inlineVolume: true });
let resourceAnti = createAudioResource(path.join(__dirname, './audio/Antifü.mp3'), { inlineVolume: true });
let playing = false;
resourceTor.volume.setVolume(0.1);
resourceAnti.volume.setVolume(0.1);

let idStruct = new Map();
let commandConstruct = new Map();
commandConstruct.set("Anpfiff", 0);
commandConstruct.set("Abpfiff", 1);
commandConstruct.set("Antifü", 2);

let messageContent = "";
let initMessage = false;
let audioPlay = false;

let urlPost = "https://discord.com/api/webhooks/1016789258205401119/fQT3D2lAp079e470lXfI6x46LXUKWhodfKR3hkrlSbkhcgonVKaLeptBruIllrmwet3W"

const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({ url: urlPost });

client.on('ready', () => {
  //create init mapping
    console.log('The bot is ready');
});

client.on('messageUpdate', (oldmessage, message) => {
  let webHook = message.webhookId;
  console.log(webHook == message.author.id);
  if(!webHook) {
    return 0;
  }

  let messageId = message.id;
  let user = message.user;
  let avatar = message.avatar;

  console.log(!initMessage)
  console.log(message.embeds != "")

  if (!initMessage && message.embeds == "") {
    initMessage = true;
    webhookClient.editMessage(messageId, {
      content: messageContent,
      username: user,
      avatarURL: avatar,
      embeds: message.embeds,
    });
    joinChannel(message.content.toString());
    console.log("joined channel");
  } else if(initMessage && message.embeds != "") {
    console.log("startAudio");
    console.log(message.embeds[0].data.title);
    if(message.embeds[0].data.title == "Tooooooor für den FCN!!!") {
      startGoal();
    } else if(message.embeds[0].data.title == "Anpfiff!") {
      player.stop();
    }
  } else if(initMessage && message.embeds == "") {
    leaveChannel();
  }
});

client.on('messageCreate', (message) => {
  let webHook = message.webhookId;
  if(!webHook) {
    return 0;
  }
  messageContent = message.content;
});

client.on("voiceStateUpdate", (oldState, newState) => {
  let oldChannelID = oldState.channelId;
  let newChannelID = newState.channelId;
  let userID = newState.id;

  if('999042423135146104' == userID) {
    return 0;
  } else if(!idStruct.get(userID)) {
    idStruct.set(userID, newChannelID);
  } else if(!newChannelID) {
    idStruct.delete(userID);
  } else {
    idStruct.delete(userID);
    idStruct.set(userID, newChannelID);
  }
});

player.on(AudioPlayerStatus.Playing, () => {
	console.log('The audio player has started playing!');
});
player.on(AudioPlayerStatus.AutoPause, () => {
	console.log('The audio player has stopped playing!');
});

function joinChannel(id) {
  console.log("Int joinChannel");
  let channel = client.channels.cache.get(id);
  connection = joinVoiceChannel({
    channelId: id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
  });
  const subscription = connection.subscribe(player);
}

function leaveChannel() {
  if(connection) {
    connection.destroy();
    return 0;
  }
  console.log("No end of game without start");
}

function startBanter() {
  if(connection) {
    player.play(resourceAnti);
    setTimeout(() => player.pause(), 16_000);
    return 0;
  }
  console.log("No playing of audio without Voice-connection");
}

function startGoal() {
  if(connection) {
    player.stop();
    resourceTor = createAudioResource(path.join(__dirname, './audio/FCN-Torhymne.mp3'), { inlineVolume: true });
    player.play(resourceTor);
    return 0;
  }
}
