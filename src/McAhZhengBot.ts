// Minecraft Plugins
import { Bot, createBot } from "mineflayer";
import { ChatMessage } from 'prismarine-chat';

// Plugins
import { createInterface } from 'readline';
import dayjs from 'dayjs';
import inquirer from 'inquirer';
import open from 'open';

// Custom Plugins
import plugins from './plugins';

// Utils
import { validate, msgTmp, i18n } from './utils';

// Custom Data
import { config, settings } from './customData';

// CMD
import { attack, inquire } from './cmd';

let count = 0;

async function startBot(isRestart = false) {
    let username = config.username;
    let password = config.password;

    if (!username) {
        await inquirer.prompt([
            {
                type: 'input',
                name: 'username',
                message: `${i18n.__('S_PLZ_INPUT_USERNAME')} >`,
                validate: (async input => !!input || i18n.__('S_USERNAME_ERROR'))
            },
            {
                type: 'password',
                name: 'password',
                message: `${i18n.__('S_PLZ_INPUT_PASSWORD')} >`
            }
        ]).then(answer => {
            username = answer.username;
            password = answer.password;
        });
    }

    plugins.spinner.start({ text: '連線中...' });

    const bot = createBot({
        host: config.server,
        username,
        password,
        auth: config.auth,
        physicsEnabled: true
    });

    // 當機器人啟動時執行
    bot.once('spawn', async () => botOnSpawn(bot, isRestart));
    // 當收到私訊時執行
    // bot.on('chat', async (username, message) => botOnChat(bot, username, message));
    // 當收到訊息時執行
    bot.on('message', async msg => botOnMessage(bot, msg));

    bot.on('error', err => {
        console.log('err :>> ', err);
    });
    // 當機器人斷線時執行
    bot.once('end', reason => botOnEnd(reason));
}

function botOnSpawn(bot: Bot, isRestart: boolean) {
    plugins.spinner.success({ text: '機器人已連線成功!!' });

    if (!isRestart) {
        registerReadline(bot);
    }

    if (settings.discord.enable_bot) {
        plugins.discord.login(settings.discord.token);
    }

    if (settings.web.viewer) {
        plugins.showMineflayerViwer({
            bot,
            firstPerson: settings.web.viewer_first_person,
            port: settings.web.viewer_port
        });
    }

    if (settings.web.backpack) {
        plugins.showBackpack({
            bot,
            port: settings.web.backpack_port
        });
    }

    if (settings.attack.auto) {
        attack.startAttack(bot, settings);
    }
}

// function botOnChat(bot: Bot, sender: string, msg: string) {
//     if (settings.whitelist.includes(sender) && (sender !== bot.username)) {
//         // useCommand(bot, msg.split('] ')[1], sender);
//     }
// }

function botOnMessage(bot: Bot, msg: ChatMessage) {
    if (!settings.health && validate.hasHealthMessage(msg.toString())) {
        return;
    }

    console.log(msg.toAnsi());
}

function botOnEnd(reason: string) {
    console.log(`斷線原因：${reason}`);
    console.log(`${msgTmp.sys} ${i18n.__('S_RECONNECT_IN_TEN_SECOND')}...\n@${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);

    setTimeout(() => {
        startBot(true);
    }, 10000);
}

function registerReadline(bot: Bot) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    readline.on('line', async line => {
        if (line.startsWith('#')) {
            const val = line.split('#')[1];
            useCommand(bot, val);
            return;
        }

        bot.chat(line);
    });
}

function useCommand(bot: Bot, str: string, sender = '') {
    switch (str) {
        /** 查看機器人資訊 */
        case 'info':
            inquire.botInfo(bot, sender);
            break;
        /** 查看經驗 */
        case 'exp':
            inquire.experience(bot, sender);
            break;
        /** 查看手持物品 */
        case 'heldItem':
            inquire.heldItem(bot, sender);
            break;
        /** 查看餘額 */
        case 'balance':
            inquire.balance(bot);
            break;
        /** 裝備劍 */
        case 'sword':
            attack.equipSword(bot);
            break;
        /** 查看機器人當前背包 */
        case 'backpack':
            settings.web.backpack
                ? open(`http://127.0.0.1:${settings.web.backpack_port}`)
                : console.log(`${msgTmp.sys} 未啟用背包查看服務`);
            break;
        /** 查看機器人當前畫面 */
        case 'viewer':
            settings.web.viewer
                ? open(`http://127.0.0.1:${settings.web.viewer_port}`)
                : console.log(`${msgTmp.sys} 未啟用當前畫面查看服務`);
            break;
        default:
            break;
    }
}

/** Main Place */
try {
    console.log(msgTmp.botBanner);
    console.log('Author：AhZheng');
    console.log('Discord：阿正#6058\n');

    startBot();
} catch (err) {
    console.log('err :>> ', err);
}
