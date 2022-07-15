// Minecraft Plugins
import { Bot, createBot } from "mineflayer";
import { ChatMessage } from 'prismarine-chat';

// Plugins
import { createInterface } from 'readline';
import dayjs from 'dayjs';
import inquirer from 'inquirer';

// Custom Plugins
import plugins from './plugins';

// Utils
import { validate, msgTmp, i18n } from './utils';

// Custom Data
import { config, settings } from './customData';

// CMD
import { attack, inquire, web } from './cmd';

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

    const bot = createBot({
        host: config.server,
        username,
        password,
        auth: config.auth,
        physicsEnabled: true
    });

    // 當機器人啟動時執行
    bot.once('spawn', async () => botOnSpawn(bot, isRestart));
    // 當收到訊息時執行
    bot.on('message', async msg => botOnMessage(bot, msg));
    // 當機器人斷線時執行
    bot.once('end', reason => botOnEnd(reason));
}

function botOnSpawn(bot: Bot, isRestart: boolean) {
    if (!isRestart) {
        registerReadline(bot);
    }

    // Discord 相關
    if (settings.discord.enable_bot) {
        plugins.discord.login(bot, settings.discord);
    }

    // 當前畫面查看服務
    if (settings.web.viewer) {
        plugins.showMineflayerViwer({
            bot,
            firstPerson: settings.web.viewer_first_person,
            port: settings.web.viewer_port
        });
    }

    // 背包查看服務
    if (settings.web.backpack) {
        plugins.showBackpack({
            bot,
            port: settings.web.backpack_port
        });
    }

    // 自動攻擊
    if (settings.attack.auto) {
        attack.startAttack(bot, settings);

        if (settings.attack.enable_detect_interrupt) {
            attack.detectAttackInterrupt(bot, settings);
        }
    }

}

function botOnMessage(bot: Bot, msg: ChatMessage) {
    if (!settings.health && validate.hasHealthMessage(msg.toString())) {
        return;
    }

    // 收到私訊
    if (validate.hasWhisper(msg.toString())) {
        const msgData = msg.toString().split('[')[1].split(' ');
        const playerId = msgData[0];
        const message = msgData[3];

        if (
            // 私訊者是否在白名單內
            validate.senderIsInWhitelist(settings.whitelist, playerId) &&
            // 私訊開頭為`#`則使用指令
            message.startsWith('#')
        ) {
            useCommand(bot, message.split('#')[1], playerId);
        }
    }

    // 收到傳送邀請
    if ((validate.hasTpa(msg.toString()) || validate.hasTpaHere(msg.toString()))) {
        const playerId = msg.toString().split(' ')[1];

        validate.senderIsInWhitelist(settings.whitelist, playerId)
            ? bot.chat(`/tpaccept ${playerId}`)
            : bot.chat(`/tpdeny ${playerId}`)
    }

    console.log(msg.toAnsi());
}

function botOnEnd(reason: string) {
    console.log(`斷線原因：${reason}`);
    console.log(`${msgTmp.sys} ${i18n.__('S_RECONNECT_IN_TEN_SECOND')}...\n@${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);

    if (settings.attack.auto) {
        attack.stopAttack(settings);
    }

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
        line.startsWith('#')
            ? useCommand(bot, line.split('#')[1])
            : bot.chat(line);
    });
}

function useCommand(bot: Bot, str: string, sender = '') {
    switch (str.toUpperCase()) {
        /** 查看機器人資訊 */
        case 'INFO':
            inquire.botInfo(bot);
            break;
        /** 查看經驗 */
        case 'EXP':
            inquire.experience(bot, sender);
            break;
        /** 查看手持物品 */
        case 'HELDITEM':
            inquire.heldItem(bot, sender);
            break;
        /** 查看餘額 */
        case 'BALANCE':
            inquire.balance(bot);
            break;
        /** 裝備劍 */
        case 'SWORD':
            attack.equipSword(bot, sender);
            inquire.heldItem(bot, sender);
            break;
        /** 查看機器人當前背包 */
        case 'BACKPACK':
            web.openBackpack(settings);
            break;
        /** 查看機器人當前畫面 */
        case 'VIWER':
            web.openViewer(settings);
            break;
        case 'ATTACK':
            attack.startAttack(bot, settings);
            break;
        default:
            sender
                ? bot.chat(`/m ${sender} ${i18n.__('S_NO_COMMAND')}`)
                : console.log(`${msgTmp.sys} ${i18n.__('S_NO_COMMAND')}`);
            break;
    }
}

/** Main Place */
try {
    console.log(msgTmp.botBanner);
    console.log('Author：AhZheng');
    console.log('Discord：阿正#6058');
    console.log(`server：${config.server}\n`);

    startBot();
} catch (error) {
    console.error('error :>> ', error);
}
