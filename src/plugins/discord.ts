import { Client, Intents } from 'discord.js';
import { msgTmp, i18n } from '../utils';

function login(token: string) {
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES
        ],
        partials: ['CHANNEL']
    });

    client.on('ready', () => {
        console.log(msgTmp.dcBoard);
        console.log(i18n.__('S_DC_BOT_ONLINE %s', client.user!.tag));
        console.log(msgTmp.dcBoard);
    });

    client.on('message', msg => {

    });

    client.on('messageCreate', msg => {

    });

    client.login(token);
}

export default {
    login
};