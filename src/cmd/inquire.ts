/**
 * Inquire
 */

import { Bot } from 'mineflayer';
import { i18n, msgTmp } from '../utils';
import chalk from 'chalk';



/** 查詢經驗值 */
function experience(bot: Bot, sender = '') {
    if (!!sender) {
        bot.chat(`/m ${sender} ${i18n.__('S_LEVEL', {
            level: msgTmp.renderGreen(`${bot.experience.level}`),
            progress: msgTmp.renderGreen(`${bot.experience.progress * 100} %`)
        }).toString()}`);
        return;
    }

    console.log(i18n.__('S_LEVEL', {
        level: msgTmp.renderGreen(`${bot.experience.level} `),
        progress: msgTmp.renderGreen(`${bot.experience.progress * 100} % `)
    }));
}

/** 查詢手持的物品 */
function heldItem(bot: Bot, sender = '') {
    if (sender) {
        bot.chat(`/ m ${sender} ${bot.heldItem ? bot.heldItem.displayName : i18n.__('S_DO_NOT_DELD_ANY')} `);
        return;
    }

    console.log(
        bot.heldItem
            ? i18n.__('S_HAND_HELD', { item: chalk.blueBright(bot.heldItem?.displayName) })
            : i18n.__('S_DO_NOT_DELD_ANY')
    );
}

/** 查詢機器人資訊 */
function botInfo(bot: Bot, sender = '') {
    if (sender) {
        bot.chat(`/ m ${sender} ${msgTmp.botInfoBoard} `);
        return;
    }

    console.log(msgTmp.botInfoBoard);
    console.log('               機器人資訊');
    console.log(msgTmp.botInfoBoard);
    console.log(i18n.__('S_NAME', { name: bot.username }));
    console.log(i18n.__('S_HEALTH', { health: `${bot.health}` }), '/ 20');
    console.log(i18n.__('S_FOOD', { food: `${bot.food}` }), '/ 20');
    console.log(i18n.__('S_LEVEL', {
        level: msgTmp.renderGreen(`${bot.experience.level} `),
        progress: msgTmp.renderGreen(`${bot.experience.progress * 100} % `)
    }));
    console.log(i18n.__('S_HAND_HELD', {
        item: chalk.blueBright(bot.heldItem ? bot.heldItem.displayName : i18n.__('S_NOTHING'))
    }));
    console.log(msgTmp.botInfoBoard);
}

/** 查詢當前餘額 */
function balance(bot: Bot) {
    bot.chat('/money');
}

export default {
    experience,
    heldItem,
    botInfo,
    balance
};