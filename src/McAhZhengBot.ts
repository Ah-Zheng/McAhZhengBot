// Minecraft Plugins
import { Bot, createBot } from "mineflayer";
import { ChatMessage } from 'prismarine-chat';

// Plugins
import { createInterface } from 'readline';
import dayjs from 'dayjs';

// Custom Plugins
import plugins from './plugins';

// Utils
import { validate, msgTmp, i18n } from './utils';

// Custom Data
import { config, settings } from './customData';

// CMD
import { inquire, raid } from './cmd';

function startBot(isRestart = false) {
    const bot = createBot({
        host: config.server,
        username: config.username,
        password: config.password,
        auth: config.auth,
        physicsEnabled: true
    });

    // 當機器人啟動時執行
    bot.once('spawn', () => botOnSpawn(bot, isRestart));
    // 當收到訊息時執行
    bot.on('message', msg => botOnMessage(bot, msg));
    // 當機器人斷線時執行
    bot.once('end', () => botOnEnd());
}

function botOnSpawn(bot: Bot, isRestart: boolean) {
    if (!isRestart) {
        registerReadline(bot);
    }

    if (settings.web.viewer) {
        plugins.showMineflayerViwer({ bot, firstPerson: settings.web.viewer_first_person });
    }

    if (settings.web.backpack) {
        plugins.showBackpack({ bot });
    }

    if (settings.attack.auto) {
        raid.attackTarget(bot, settings);
    }
}

function botOnMessage(bot: Bot, msg: ChatMessage) {
    if (!settings.health && validate.hasHealthMessage(msg.toString())) {
        return;
    }

    // 當收到私訊時執行
    if (validate.hasPointToYou(msg.toString())) {
        inquire.experience(bot, '');
    }

    console.log(msg.toAnsi());
}

function botOnEnd() {
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
        switch (line) {
            case 'exp':
                inquire.experience(bot);
                break;
            case 'sword':
                raid.equipSword(bot);
                break;
            case 'heldItem':
                inquire.heldItem(bot);
                break;
            default:
                bot.chat(line);
                break;
        }
    });
}

/** Main Place */
try {
    startBot();
} catch (err) {
    console.log('err :>> ', err);
}
