const Discord = require('discord.js');
const { joinVoiceChannel, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
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

client.on('ready', () => {
  //create init mapping
    console.log('The bot is ready');
});

client.on('messageUpdate', (message) => {
  let webHook = message.webhookId;
  if(!webHook) {
    return 0;
  }
  console.log(webHook);
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
    player.play(resourceTor);
    return 0;
  }
  console.log("Rocket League is active but no connection was established");
}
