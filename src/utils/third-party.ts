import { Bot } from 'mineflayer';
import i18n from './i18n';
import chalk from 'chalk';
import msgTmp from './message-tmp';

const inventoryViwer = require('mineflayer-web-inventory');
const mineflayerViwer = require('prismarine-viewer').mineflayer;
const openWeb = require('open');

export interface ThirdPartyOptions {
    isShow: boolean;
    bot: Bot;
}

export interface MineflayerViwerOption extends ThirdPartyOptions {
    port?: number;
    firstPerson: boolean;
}

export interface ShowBackpackOption extends ThirdPartyOptions {
    port?: number;
}

// 查看機器人當前畫面
function showMineflayerViwer({
    isShow,
    bot,
    port = 3007,
    firstPerson,
}: MineflayerViwerOption) {
    if (isShow) {
        mineflayerViwer(bot, {
            port: port,
            firstPerson: firstPerson
        });
        openWeb(`http://localhost:${port}`);
        console.log(`${msgTmp.sys} ${chalk.hex('#00cc99')(`${i18n.__('S_CHECK_BOT_VIEWER')} => http://localhost:${port}`)}`);
    }
}

// 查看背包服務
function showBackpack({
    isShow,
    bot,
    port = 3000
}: ShowBackpackOption) {
    if (isShow) {
        inventoryViwer(bot);
        openWeb(`http://localhost:${port}`);
        console.log(`${msgTmp.sys} ${chalk.hex('#00cc99')(`查看機器人背包請打開 => http://localhost:${port}`)}`);
    }
}

export default {
    showMineflayerViwer,
    showBackpack
}