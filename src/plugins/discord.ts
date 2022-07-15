import { Client, Intents, Options, AnyChannel } from 'discord.js';
import { msgTmp, i18n } from '../utils';
import { Discord } from '../customData';
import { Bot } from 'mineflayer';

function login(bot: Bot, option: Discord) {
    if (!option.token) {
        console.log('未輸入 DC BOT 的 Token');
        return;
    }

    const client = new Client({
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'DIRECT_MESSAGES'
        ],
        partials: ['CHANNEL']
    });
    // let channel: AnyChannel | undefined = undefined;

    // if (option.channel_id && option.enable_send_to_channel) {
    //     channel = client.channels.cache.get(option.channel_id);
    // }

    client.on('ready', () => {
        console.log(msgTmp.dcBoard);
        console.log(i18n.__('S_DC_BOT_ONLINE', { botTag: client.user!.tag }));
        console.log(msgTmp.dcBoard);
    });

    client.on('messageCreate', msg => {
        // if (channel && (msg.channel.id !== channel.id)) return;
        // if (client.user && (msg.author.id === client.user.id)) return;

        // bot.chat(``);
    });

    bot.on('chat', (username, message) => {

    });

    client.login(option.token);
}

export default {
    login
};