/** 是否有血量 */
function hasHealthMessage(str: string): boolean {
    const reg = new RegExp(/目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g);
    return reg.test(str);
}

/** 是否有人私訊 */
function hasWhisper(str: string): boolean {
    return str.includes('-> 您]') || str.includes('-> you]');
}

/** 私訊者是否有在白名單內 */
function senderIsInWhitelist(whitelsit: string[], sender: string) {
    return whitelsit.includes(sender);
}

function hasTpa(str: string) {
    return str.includes('要傳送到 你 的位置');
}

function hasTpaHere(str: string) {
    return str.includes('想要你傳送到 該玩家 的位置');
}

export {
    hasHealthMessage,
    hasWhisper,
    senderIsInWhitelist,
    hasTpa,
    hasTpaHere
};