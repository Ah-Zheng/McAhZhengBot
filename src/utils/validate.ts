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

/** 是否有人要傳送到機器人的位置 */
function hasTpa(str: string) {
    return str.includes('要傳送到 你 的位置');
}

/** 是否有人要將機器人傳送走 */
function hasTpaHere(str: string) {
    return str.includes('想要你傳送到 該玩家 的位置');
}

/** 驗證訊息含有「讀取統計資料成功」 */
function hasReportData(str: string) {
    return str.includes('讀取統計資料成功');
}

/** 已經傳送至指定的公傳 */
function hasAlreadyTeleport(str: string, target: string) {
    console.log('str.includes(傳送您至公共傳送點) :>> ', str.includes('傳送您至公共傳送點'));
    console.log('str.includes(target) :>> ', str.includes(target));
    return str.includes('傳送您至公共傳送點') && str.includes(target);
}

export {
    hasHealthMessage,
    hasWhisper,
    senderIsInWhitelist,
    hasTpa,
    hasTpaHere,
    hasReportData,
    hasAlreadyTeleport
};