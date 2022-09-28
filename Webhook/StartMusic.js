let urlPost = "https://discord.com/api/webhooks/1016789258205401119/fQT3D2lAp079e470lXfI6x46LXUKWhodfKR3hkrlSbkhcgonVKaLeptBruIllrmwet3W"

const fs = require('fs');
hideSelf();
const { EmbedBuilder, WebhookClient } = require('discord.js');
const path = require('path');

const webhookClient = new WebhookClient({ url: urlPost });

let messageId = fs.readFileSync(path.join(__dirname, "..", "properties", "messageID.txt"), 'utf8');
console.log(messageId);
const embed = new EmbedBuilder()
	.setTitle('Tooooooor für den FCN!!!')
	.setColor(0xAD1732);

webhookClient.editMessage(messageId, {
	content: "messageContent",
	username: "user",
	avatarURL: "avatar",
	embeds: [embed],
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
