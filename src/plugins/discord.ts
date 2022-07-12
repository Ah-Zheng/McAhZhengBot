import { Client, Intents } from 'discord.js';

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
        console.log('object');
    });

    client.on('messageCreate', msg => {

    });

    client.login(token);
}

export default {
    login
};