/**
 * Raid 攻擊相關功能
 */

import { Bot } from 'mineflayer';
import { Settings } from '../customData';
import { i18n } from '../utils';

/** 攻擊目標 */
function attackTarget(bot: Bot, settings: Settings) {
    const preyList = settings.attack.list;

    bot.on('physicsTick', () => {
        for (let preyEntity in bot.entities) {
            if (
                // 檢測機器人與目標距離是否小於等於6
                bot.entity.position.distanceTo(bot.entities[preyEntity].position) <= 6 &&
                // 比對是否為要攻擊的目標
                preyList.includes(bot.entities[preyEntity].name as string)
            ) {
                bot.attack(bot.entities[preyEntity]);
            }
        }
    });
}

/** 偵測停止打怪 */
function detectAttackStop() {
    //
}

/** 將劍裝備到手上 */
function equipSword(bot: Bot) {
    for (let item of bot.inventory.items()) {
        if (item.name.endsWith('sword')) {
            bot.equip(item, 'hand');
            break;
        }
    }

    if (bot.heldItem && bot.heldItem.displayName.includes('Sword')) {
        console.log(`${i18n.__('S_ALREADY_EQUIP_SWORD')} ${bot.heldItem.displayName}`);
    }
}

export default {
    attackTarget,
    equipSword
};