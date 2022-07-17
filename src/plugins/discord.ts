import { Client, AnyChannel, Message, TextChannel } from 'discord.js';
import { msgTmp, i18n } from '../utils';
import { Settings } from '../customData';
import { Bot } from 'mineflayer';
import { inquire } from '../cmd';

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES'
    ],
    partials: ['CHANNEL']
});

export default (bot: Bot, settings: Settings) => {
    /** 連線至 DC BOT */
    const login = () => {
        if (!settings.discord.token) {
            console.log('未輸入 DC BOT 的 Token');
            return;
        }

        // 與 DC 機器人連上時執行
        client.on('ready', () => {
            console.log(msgTmp.dcBoard);
            console.log(i18n.__('S_DC_BOT_ONLINE', { botTag: client.user!.tag }));
            console.log(msgTmp.dcBoard);
        });
        // 當收到來自 DC 機器人的訊息時
        client.on('messageCreate', msg => {
            // 若發送者是機器人本身
            if (msg.author.id === client.user?.id) return;

            // 若發送的頻道不是設定的頻道
            if (msg.channel.id !== settings.discord.channel_id) return;

            // 若發送者並非指定使用者
            if (msg.author.id !== settings.discord.user_id) {
                msg.channel.send(i18n.__('S_NO_PERMISSION'));
                return;
            }

            if (msg.content.startsWith('#')) {
                switch (msg.content.split('#')[1].toLowerCase()) {
                    case 'info':
                        sendMessage(inquire(bot).discord.botInfo());
                        break;
                    case 'exp':
                        sendMessage(inquire(bot).discord.experience());
                        break;
                    case 'helditem':
                        sendMessage(inquire(bot).discord.heldItem());
                        break;
                    case 'restart':
                        bot.quit(i18n.__('S_MANUAL_RESTART'));
                        break;
                    default:
                        break;
                }
            }
        });

        client.login(settings.discord.token);
    }

    /** 發送訊息至 DC */
    const sendMessage = (msg: string, sender = '') => {
        if (settings.discord.enable_send_to_channel) {
            if (!settings.discord.channel_id) {
                console.log(i18n.__('S_NO_CHANNEL_ID'));
                return;
            }

            const channel = client.channels.cache.get(settings.discord.channel_id) as TextChannel;

            if (!channel) {
                console.log(i18n.__('S_CHANNEL_NOT_FOUND'));
                return;
            }

            channel.send(msg);

            return;
        }

        // TODO send msg to user
    };

    return {
        login,
        sendMessage
    };
}