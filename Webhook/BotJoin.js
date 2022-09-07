let urlPost = "https://discord.com/api/webhooks/1016789258205401119/fQT3D2lAp079e470lXfI6x46LXUKWhodfKR3hkrlSbkhcgonVKaLeptBruIllrmwet3W"

const { EmbedBuilder, WebhookClient } = require('discord.js');
const fs = require('fs');

const webhookClient = new WebhookClient({ url: urlPost });

let trainerWahl = Math.floor(Math.random() * 5);
let content = "";
let user = "";
let avatar = "";

switch (trainerWahl) {
  case 0:
    content = "Mit dem besten Trainer fallen viele Tore!";
    user = "Alois Schwartz";
    avatar = "https://cdn.ligainsider.de/images/coach/large/alois-schwartz.jpg";
    break;
  case 1:
    content = "Mein Name ist Programm!";
    user = "Jens Keller";
    avatar = "https://upload.wikimedia.org/wikipedia/commons/7/72/Jens_Keller_2016_%28cropped%29.jpg";
    break;
  case 2:
    content = "Ohne Mittelfeld fallen die meisten Tore!";
    user = "Damir Canadi";
    avatar = "https://img.a.transfermarkt.technology/portrait/header/4918-1469641634.jpg?lm=1";
    break;
  case 3:
    content = "Sogar für Liga 2 zu schwach!";
    user = "Valérien Ismaël";
    avatar = "https://img.a.transfermarkt.technology/portrait/header/12871-1574261536.jpg?lm=1";
    break;
  case 4:
    content = "afkomst oud!";
    user = "Gertjaan Verbeek";
    avatar = "https://www.gn-online.de/bilder/der-ehemalige-twente-trainer-gertjan-verbeek-kuemmert-sich-803407og.jpg";
    break;
}

let messageID = "1";

function f() {
  return new Promise(resolve => {
    let result = webhookClient.send({
      content: content,
      username: user,
      avatarURL: avatar
    });
		setTimeout(() => resolve(result), 2000);
	});
}

f().then(result => {
  messageID = result.id;
  fs.writeFileSync('../properties/messageID.txt', messageID);
});
