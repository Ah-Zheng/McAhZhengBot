import { Bot } from 'mineflayer';
import inquire from './inquire';
import attack from './attack';

function useCommand(bot: Bot, str: string, sendAuther = '') {
    switch (str) {
        case 'info':
            inquire.botInfo(bot, sendAuther);
            break;
        case 'exp':
            inquire.experience(bot, sendAuther);
            break;
        case 'heldItem':
            inquire.heldItem(bot, sendAuther);
            break;
        case 'balance':
            inquire.balance(bot);
            break;
        case 'sword':
            attack.equipSword(bot);
            break;
        default:
            bot.chat(str);
            break;
    }
}

export {
    inquire,
    attack,
    useCommand
};