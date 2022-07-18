import chalk from 'chalk';
import figlet from 'figlet';
import gradientString from 'gradient-string';

/** Bot Banner */
const botBanner = gradientString.rainbow(figlet.textSync("McAhZhengBot"));
/** 系統 */
const sys = `[${renderAzureBlue('McAhZhengBot')}]`;
/** Discord使用 */
const dcBoard = renderDCBlue('========================================');
/** minecraft bot info Board */
const botInfoBoard = renderGold('========================================');

/**
 * 六角綠
 * #00cc99
 * */
function renderGreen(str: string) {
    return chalk.hex('#00cc99')(str);
}

/**
 * DC藍
 * #5864F2
 * */
function renderDCBlue(str: string) {
    return chalk.hex('#5864F2')(str);
}

/**
 * 湛藍
 * #007FFF
 * */
function renderAzureBlue(str: string) {
    return chalk.hex('#007FFF')(str);
}

/**
 * 金色
 * #FFD700
 * */
function renderGold(str: string) {
    return chalk.hex('#FFD700')(str);
}

/**
 * Discord Block
 */
function discordBlock(str: string) {
    return `\`\`\`\n${str}\n\`\`\``;
}

export {
    botBanner,
    sys,
    dcBoard,
    botInfoBoard,
    renderGreen,
    renderDCBlue,
    renderAzureBlue,
    renderGold,
    discordBlock
};