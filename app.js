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
        botMember.setNickname(`${config.TARGET_USER_ONLINE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_OFF`);
        break; 
        
        case 'idle': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'idle' });
        botMember.setNickname(`${config.TARGET_USER_IDLE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_IDLE`);
        break; 
        
        case 'dnd':
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'dnd' });
        botMember.setNickname(`${config.TARGET_USER_DND_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_DND`);
        break; 
        
        case 'offline': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'online' });
        botMember.setNickname(`${config.TARGET_USER_OFFLINE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_ON`);
        break; 

        case 'undefined': 
        client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'online' });
        botMember.setNickname(`${config.TARGET_USER_OFFLINE_BOT_NICK}`);
        console.log(`[${getNow()}] BOTのステータスを切り替えました_ON`);
        break; 
    }
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
            client.user.setPresence({ activities: [{ name: `${config.DISCORD_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'invisible' });
            botMember.setNickname(`${config.TARGET_USER_ONLINE_BOT_NICK}`);
            break; 
            
            case 'idle': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスが退席中になりました`); 
            client.user.setPresence({ activities: [{ name: `${config.TARGET_USER_IDLE_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'idle' });
            botMember.setNickname(`${config.TARGET_USER_IDLE_BOT_NICK}`);
            break; 
            
            case 'dnd': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスが取り込み中になりました`); 
            client.user.setPresence({ activities: [{ name: `${config.TARGET_USER_DND_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'dnd' });
            botMember.setNickname(`${config.TARGET_USER_DND_BOT_NICK}`);
            break; 
            
            case 'offline': 
            console.log(`[${getNow()}] ${oldPresence.user.tag} のステータスがオフラインになりました`); 
            client.user.setPresence({ activities: [{ name: `${config.TARGET_USER_OFFLINE_BOT_STATUS_MESSAGE}`, type: ActivityType.Playing }], status: 'online' });
            botMember.setNickname(`${config.TARGET_USER_OFFLINE_BOT_NICK}`);
            break; 
        } 
    } 
});

// ログイン
client.login(config.DISCORD_BOT_TOKEN);