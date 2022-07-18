// Minecraft Plugins
import { Bot, createBot } from "mineflayer";
import { ChatMessage } from 'prismarine-chat';

// Plugins
import { createInterface, Interface } from 'readline';
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

let username = config.username;
let password = config.password;
let readline: Interface | null = null;

async function startBot(isRestart = false) {
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
        port: config.port,
        version: config.version,
        username,
        password,
        auth: config.auth,
        physicsEnabled: true
    });

    // 當機器人啟動時執行
    bot.once('spawn', () => botOnSpawn(bot, isRestart));
    // 當收到訊息時執行
    bot.on('message', async msg => botOnMessage(bot, msg, isRestart));
    // 當機器人斷線時執行
    bot.once('end', reason => botOnEnd(bot, reason));
}

function botOnSpawn(bot: Bot, isRestart: boolean) {
    if (!isRestart) {
        readline = createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
    }

    readlineEvent(bot);

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

    // Discord 相關
    if (!isRestart && settings.discord.enable_bot) {
        plugins.discord(bot, settings).login();
    }

    // 自動攻擊
    if (settings.attack.auto) {
        attack.startAttack(bot, settings);

        // 偵測中斷
        if (settings.attack.enable_detect_interrupt) {
            attack.detectAttackInterrupt(bot, settings);
        }
    }

}

function botOnMessage(bot: Bot, msg: ChatMessage, isRestart: boolean) {
    if (!settings.health && validate.hasHealthMessage(msg.toString())) return;

    // 收到私訊
    if (validate.hasWhisper(msg.toString())) {
        const msgData = msg.toString().split('[')[1].split(' ');
        const playerId = msgData[0];
        const message = msgData[3];

        // 私訊者是否在白名單內
        if (validate.senderIsInWhitelist(settings.whitelist, playerId)) {
            switch (message.toUpperCase()) {
                /** 查看經驗 */
                case 'EXP':
                    inquire(bot).bot(playerId).experience();
                    break;
                /** 查看手持物品 */
                case 'HELDITEM':
                    inquire(bot).bot(playerId).heldItem();
                    break;
                /** 裝備劍 */
                case 'SWORD':
                    attack.equipSword(bot, playerId);
                    break;
                /** 手動重啟 */
                case 'RESTART':
                    bot.quit(i18n.__('S_MANUAL_RESTART'));
                    break;
                default:
                    bot.chat(`/m ${playerId} ${i18n.__('S_NO_COMMAND')}`)
                    break;
            }
        }
    }

    // 收到傳送邀請
    if ((validate.hasTpa(msg.toString()) || validate.hasTpaHere(msg.toString()))) {
        const playerId = msg.toString().split(' ')[1];

        validate.senderIsInWhitelist(settings.whitelist, playerId)
            ? bot.chat(`/tpaccept ${playerId}`)
            : bot.chat(`/tpdeny ${playerId}`)
    }

    // 重啟後將機器人傳送到指定的公傳
    if (isRestart && validate.hasReportData(msg.toString())) {
        if (settings.restart.enable_teleport && settings.restart.public_teleportation_id) {
            bot.chat(`/warp ${settings.restart.public_teleportation_id}`);
        }
    }

    console.log(msg.toAnsi());
}

function botOnEnd(bot: Bot, reason: string) {
    console.log(i18n.__('S_DISCONNECT_REASON', { reason }));
    console.log(`${msgTmp.sys} ${i18n.__('S_RECONNECT_IN_TEN_SECOND', { second: settings.restart.wait_time.toString() })}`);
    console.log(`@${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')} `);

    if (settings.discord.enable_bot) {
        plugins.discord(bot, settings).sendMessage(`\`\`\`
            ${i18n.__('S_DISCONNECT_REASON', { reason })}
            ${i18n.__('S_RECONNECT_IN_TEN_SECOND', { second: settings.restart.wait_time.toString() })}
            @${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}\`\`\``);
    }

    // 斷線後移除 readline 偵聽 line 事件
    if (readline) {
        readline.removeAllListeners('line');
    }

    // 停止偵聽攻擊中斷
    if (settings.attack.auto && settings.attack.enable_detect_interrupt) {
        attack.stopDetectAttack();
    }

    // 斷線後移除所有 bot 偵聽事件
    bot.removeAllListeners();

    setTimeout(() => startBot(true), settings.restart.wait_time * 1000);
}

function readlineEvent(bot: Bot) {
    if (!readline) {
        console.error('');
        return;
    }

    readline.on('line', async line => {
        if (line.startsWith('#')) {
            switch (line.split('#')[1].toUpperCase()) {
                /** 查看機器人資訊 */
                case 'INFO':
                    inquire(bot).terminal.botInfo();
                    break;
                /** 查看經驗 */
                case 'EXP':
                    inquire(bot).terminal.experience();
                    break;
                /** 查看手持物品 */
                case 'HELDITEM':
                    inquire(bot).terminal.heldItem();
                    break;
                /** 查看餘額 */
                case 'BALANCE':
                    inquire(bot).terminal.balance();
                    break;
                /** 裝備劍 */
                case 'SWORD':
                    attack.equipSword(bot);
                    break;
                /** 查看機器人當前背包 */
                case 'BACKPACK':
                    web.openBackpack(settings);
                    break;
                /** 查看機器人當前畫面 */
                case 'VIEWER':
                    web.openViewer(settings);
                    break;
                /** 手動重啟 */
                case 'RESTART':
                    bot.quit(i18n.__('S_MANUAL_RESTART'));
                    break;
                default:
                    console.log(`${msgTmp.sys} ${i18n.__('S_NO_COMMAND')}`);
                    break;
            }

            return;
        }

        bot.chat(line);
    });
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
