/**
 * Inquire 查詢Bot資訊
 */

import { Bot } from 'mineflayer';
import { i18n } from '../utils';
import chalk from 'chalk';



// 查詢經驗值
function experience(bot: Bot, sendAuther = '') {
    if (sendAuther) {
        bot.chat(`/m ${sendAuther} ${i18n.__('S_LEVEL %s', bot.experience.level.toString())}`);
        return;
    }

    console.log(`BotName：${bot.username}, ${i18n.__('S_LEVEL %s', chalk.hex('#00cc99')(`${bot.experience.level}`))}`);
}

// 查詢手持的物品
function heldItem(bot: Bot, sendAuther = '') {
    if (sendAuther) {
        bot.chat(`/m ${sendAuther} ${bot.heldItem?.displayName}`);
        return;
    }

    console.log(i18n.__('S_HAND_HELD %s', chalk.blueBright(bot.heldItem?.displayName)));
}

export default {
    experience,
    heldItem
};