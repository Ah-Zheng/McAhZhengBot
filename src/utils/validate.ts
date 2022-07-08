function hasHealthMessage(str: string): boolean {
    const reg = new RegExp(/目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g);
    return reg.test(str);
}

export default {
    hasHealthMessage
};