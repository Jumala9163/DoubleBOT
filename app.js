// 必要な物を召喚
const { Client, GatewayIntentBits, ActivityType } = require('discord.js'); 
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] }); 
require('date-utils');

// jsonをロード 
var config = require('./config.json'); 

// TOKEN確認 
if (config.DISCORD_BOT_TOKEN == undefined) { 
    console.error("TOKENが設定されていません。"); 
    process.exit(0); 
}

// 時刻取得
function getNow() {
    var dt = new Date();
    var formatted = dt.toFormat("YYYY-MM-DD-HH24-MI-SS");
    return formatted;
}

// ログイン完了時処理
client.on("ready", () => { 

    console.log(`[${getNow()}] ログイン完了: ${client.user.tag}`);
    console.log(`[${getNow()}] ターゲットユーザーのステータスを取得します...`)

    const guild = client.guilds.cache.get(config.TARGET_GUILD_ID);
    const member = guild.members.cache.get(config.TARGET_USER_ID);
    const botMember = guild.members.cache.get(client.user.id);
    const target_user_status = member.presence?.status;

    console.log(`[${getNow()}] 現在のターゲットユーザーのステータスは ${target_user_status} です`)

    switch (target_user_status) { 
        case 'online': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'invisible' });
        if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_ONLINE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_OFF`);
        if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`BOT起動完了しました\n現在のステータス[OFF]`);
        break; 
        
        case 'idle': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'idle' });
        if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_IDLE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_IDLE`);
        if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`BOT起動完了しました\n現在のステータス[IDLE]`);
        break; 
        
        case 'dnd':
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'dnd' });
        if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_DND_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_DND`);
        if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`BOT起動完了しました\n現在のステータス[DND]`);
        break; 
        
        case 'offline': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'online' });
        if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_OFFLINE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_ON`);
        if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`BOT起動完了しました\n現在のステータス[ON]`);
        break; 

        case 'undefined': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'online' });
        if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_OFFLINE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_ON`);
        if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`BOT起動完了しました\n現在のステータス[ON]`);
        break; 
    }

    if (config.CHANGE_BOT_NICK == false) botMember.setNickname(``);

}); 



//着火
client.on('presenceUpdate', (oldPresence, newPresence) => { 
    const guild = client.guilds.cache.get(config.TARGET_GUILD_ID);
    const botMember = guild.members.cache.get(client.user.id);
    const target_user_id = oldPresence?.user.id;
    
    if(target_user_id == config.TARGET_USER_ID) {
        switch (newPresence.status) { 
            case 'online': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスがオンラインになりました`); 
            if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`${oldPresence.user.tag} のステータスがオンラインになりました`);
            client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'invisible' });
            if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_ONLINE_BOT_NICK}`);
            break; 
            
            case 'idle': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスが退席中になりました`);
            if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`${oldPresence.user.tag} のステータスが退席中になりました`);
            client.user.setPresence({ activities: [{ name: `${config.TARGET_USER_IDLE_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'idle' });
            if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_IDLE_BOT_NICK}`);
            break; 
            
            case 'dnd': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスが取り込み中になりました`); 
            if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`${oldPresence.user.tag} のステータスが取り込み中になりました`);
            client.user.setPresence({ activities: [{ name: `${config.TARGET_USER_DND_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'dnd' });
            if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_DND_BOT_NICK}`);
            break; 
            
            case 'offline': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスがオフラインになりました`); 
            if (config.NOTIFY_TAGET_USER_STATUS_CHANGE == true) client.channels.cache.get(config.NOTIFY_TAGET_USER_STATUS_CHANGE_CHANNEL_ID).send(`${oldPresence.user.tag} のステータスがオフラインになりました`);
            client.user.setPresence({ activities: [{ name: `${config.TARGET_USER_OFFLINE_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'online' });
            if (config.CHANGE_BOT_NICK == true) botMember.setNickname(`${config.TARGET_USER_OFFLINE_BOT_NICK}`);
            break; 
        } 
    } 
});

// ログイン
client.login(config.DISCORD_BOT_TOKEN);