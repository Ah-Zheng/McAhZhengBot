/**
 * Raid 攻擊相關功能
 */

import { Bot } from 'mineflayer';
import { Settings } from '../customData';

// 攻擊目標
function attackTarget(bot: Bot, settings: Settings) {
    const preyList = settings.attack.list;

    bot.on('physicsTick', () => {
        // TODO 自動攻擊
        for (let preyEntity in bot.entities) {
            if (
                bot.entity.position.distanceTo(bot.entities[preyEntity].position) <= 6 &&
                preyList.includes(bot.entities[preyEntity].name as string)
            ) {
                bot.attack(bot.entities[preyEntity]);
            }
        }
    });
}

// 將劍裝備到手上
function equipSword(bot: Bot) {
    for (let item of bot.inventory.items()) {
        if (item.name.endsWith('sword')) {
            bot.equip(item, 'hand');
            break;
        }
    }
    console.log(bot.heldItem?.displayName);
}

export default {
    attackTarget,
    equipSword
};