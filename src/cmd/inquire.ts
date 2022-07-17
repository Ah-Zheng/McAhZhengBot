/**
 * Inquire
 */

import { Bot } from 'mineflayer';
import { i18n, msgTmp } from '../utils';
import chalk from 'chalk';

const inquire = (bot: Bot) => ({
    // 機器人觸發指令
    bot: (sender: string) => ({
        /** 查詢經驗值 */
        experience: () => (bot.chat(`/m ${sender} ${i18n.__('S_LEVEL', {
            level: bot.experience.level.toString(),
            progress: (Math.ceil(bot.experience.progress * 100)).toString()
        })}`)),
        // /** 查詢手持的物品 */
        heldItem: () => (bot.chat(`/m ${sender} ${bot.heldItem
            ? i18n.__('S_HAND_HELD', { item: bot.heldItem.displayName })
            : i18n.__('S_DO_NOT_HELD_ANY')}`)),
    }),
    // 本地觸發指令
    terminal: {
        /** 查詢經驗值 */
        experience: () => (console.log(i18n.__('S_LEVEL', {
            level: msgTmp.renderGreen(`${bot.experience.level}`),
            progress: msgTmp.renderGreen(`${Math.ceil(bot.experience.progress * 100)}`)
        }))),
        /** 查詢手持的物品 */
        heldItem: () => (console.log(
            bot.heldItem
                ? i18n.__('S_HAND_HELD', { item: chalk.blueBright(bot.heldItem.displayName) })
                : i18n.__('S_DO_NOT_DELD_ANY')
        )),
        /** 查詢機器人資訊 */
        botInfo: () => {
            console.log(msgTmp.botInfoBoard);
            console.log('               機器人資訊');
            console.log(msgTmp.botInfoBoard);
            console.log(i18n.__('S_NAME', { name: bot.username }));
            console.log(i18n.__('S_HEALTH', { health: `${Math.ceil(bot.health)}` }));
            console.log(i18n.__('S_FOOD', { food: `${Math.ceil(bot.food)}` }));
            console.log(i18n.__('S_LEVEL', {
                level: msgTmp.renderGreen(`${bot.experience.level}`),
                progress: msgTmp.renderGreen(`${Math.ceil(bot.experience.progress * 100)}`)
            }));
            console.log(i18n.__('S_HAND_HELD', {
                item: chalk.blueBright(bot.heldItem ? bot.heldItem.displayName : i18n.__('S_NOTHING'))
            }));
            console.log(msgTmp.botInfoBoard);
        },
        balance: () => (bot.chat('/money'))
    },
    // Disciord 觸發指令
    discord: {
        /** 查詢經驗值 */
        experience: () => (i18n.__('S_LEVEL', {
            level: bot.experience.level.toString(),
            progress: Math.ceil(bot.experience.progress * 100).toString()
        })),
        heldItem: () => (bot.heldItem
            ? i18n.__('S_HAND_HELD', { item: bot.heldItem.displayName })
            : i18n.__('S_DO_NOT_DELD_ANY')
        ),
        botInfo: () => (
            `\`\`\`
            ${i18n.__('S_NAME', { name: bot.username })}
            ${i18n.__('S_HEALTH', { health: Math.ceil(bot.health).toString() })}
            ${i18n.__('S_FOOD', { food: Math.ceil(bot.food).toString() })}
            ${i18n.__('S_LEVEL', {
                level: bot.experience.level.toString(),
                progress: Math.ceil(bot.experience.progress * 100).toString()
            })}
            ${i18n.__('S_HAND_HELD', { item: bot.heldItem ? bot.heldItem.displayName : i18n.__('S_NOTHING') })}\`\`\``)
    }
});

export default inquire;