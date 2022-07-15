/**
 * Attack
 */

import { Bot } from 'mineflayer';
import { Settings } from '../customData';
import { i18n } from '../utils';

let hasTarget = false;
let detectAttackInterruptInterval: NodeJS.Timer | null = null;
let attacking = true;

/** 攻擊目標 */
function startAttack(bot: Bot, settings: Settings) {
    const preyList = settings.attack.list;
    let count = 0;

    const autoAttackLoop = () => {
        if (!attacking) {
            bot.removeListener('physicsTick', autoAttackLoop);
            attacking = true;
            return;
        }

        count++;

        if (count === settings.attack.interval_ticks) {
            hasTarget = false

            for (let preyEntity in bot.entities) {
                if (
                    // 檢測機器人與目標距離是否小於等於6
                    bot.entity.position.distanceTo(bot.entities[preyEntity].position) <= 6 &&
                    // 比對是否為要攻擊的目標
                    preyList.includes(bot.entities[preyEntity].name as string)
                ) {
                    bot.attack(bot.entities[preyEntity]);
                    if (!hasTarget) {
                        hasTarget = true
                    }
                }
            }
            count = 0;
        }
    }

    bot.on('physicsTick', autoAttackLoop);
}

/** 偵測是否停止攻擊 */
function detectAttackInterrupt(bot: Bot, settings: Settings) {
    let expPoint = 0;

    detectAttackInterruptInterval = setInterval(() => {
        if (!hasTarget || expPoint === bot.experience.points) {
            bot.chat(`/m ${settings.whitelist[0]} 未發現指定生物`);
        }
        expPoint = bot.experience.points;
    }, settings.attack.check_target_cycle_time * 1000);
}

/** 停止攻擊 */
function stopAttack(settings: Settings) {
    if (settings.attack.enable_detect_interrupt) {
        clearInterval(detectAttackInterruptInterval!);
    }

    attacking = false;
}

/** 將劍裝備到手上 */
function equipSword(bot: Bot, sender = '') {
    let hasSword = false;

    for (let item of bot.inventory.items()) {
        if (item.name.endsWith('sword')) {
            bot.equip(item, 'hand');
            hasSword = true;
            break;
        }
    }

    if (!hasSword) {
        sender
            ? bot.chat(`/m ${sender} ${i18n.__('NO_SWORD')}`)
            : console.log(`${i18n.__('NO_SWORD')}`);
        return;
    }

    sender
        ? bot.chat(`/m ${sender} ${i18n.__('S_ALREADY_EQUIP_SWORD')} ${bot.heldItem!.displayName}`)
        : console.log(`${i18n.__('S_ALREADY_EQUIP_SWORD')} ${bot.heldItem!.displayName}`);
}

export default {
    startAttack,
    detectAttackInterrupt,
    stopAttack,
    equipSword
};