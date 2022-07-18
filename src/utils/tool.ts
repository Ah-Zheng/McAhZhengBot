// 清除行頭空白
export function removeLeadingSpace(str: string) {
    return str.replace(/^\s+/gm, '');
}