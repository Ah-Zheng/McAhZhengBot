import { Bot } from 'mineflayer';
import { msgTmp, i18n } from '../utils';
import chalk from 'chalk';
import discord from './discord';
import spinner from './nanospinner';

const inventoryViwer = require('mineflayer-web-inventory');
const mineflayerViwer = require('prismarine-viewer').mineflayer;
const openWeb = require('open');

export interface ThirdPartyOptions {
    /** 機器人實例 */
    bot: Bot;
}

export interface MineflayerViwerOption extends ThirdPartyOptions {
    /** 服務Port號 */
    port?: number;
    /** 是否使用第一人稱視角 */
    firstPerson: boolean;
}

export interface ShowBackpackOption extends ThirdPartyOptions {
    /** 服務Port號 */
    port?: number;
}

// 查看機器人當前畫面
function showMineflayerViwer({
    bot,
    port = 3007,
    firstPerson,
}: MineflayerViwerOption) {
    mineflayerViwer(bot, {
        port: port,
        firstPerson: firstPerson
    });
    openWeb(`http://localhost:${port}`);
    console.log(`${msgTmp.sys} ${chalk.hex('#00cc99')(`${i18n.__('S_CHECK_BOT_VIEWER')} => http://localhost:${port}`)}`);
}

// 查看背包服務
function showBackpack({
    bot,
    port = 3000
}: ShowBackpackOption) {
    inventoryViwer(bot);
    openWeb(`http://localhost:${port}`);
    console.log(`${msgTmp.sys} ${chalk.hex('#00cc99')(`${i18n.__('S_CHECK_BOT_BACKPACK')} => http://localhost:${port}`)}`);
}

export default {
    showMineflayerViwer,
    showBackpack,
    discord,
    spinner
};