function hasHealthMessage(str: string): boolean {
    const reg = new RegExp(/目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g);
    return reg.test(str);
}

function hasPointToYou(str: string): boolean {
    return str.includes('-> you]')
}

export {
    hasHealthMessage,
    hasPointToYou
};