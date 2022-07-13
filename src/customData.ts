export interface Config {
    /** 伺服器IP */
    server: string;
    /** port號 */
    port?: number;
    /** minecraft 版本號 */
    version?: string;
    /** 帳號(mail) */
    username: string;
    /** 密碼 */
    password: string;
    /** 語系 */
    language: 'zh-tw' | 'en';
    /** 驗證器 */
    auth: 'microsoft' | 'mojang'
}

export interface Web {
    /** 是否開啟查看背包服務 */
    backpack: boolean;
    /** 是否開啟查看機器人當前畫面 */
    viewer: boolean;
    /** 是否以第一人稱查看機器人當前畫面 */
    viewer_first_person: boolean;
}

export interface Attack {
    /** 是否自動攻擊 */
    auto: boolean;
    /** 攻擊清單 */
    list: string[];
}

export interface Discord {
    /** Discord Bot Token  */
    token: string;
    /** 是否啟用DC Bot */
    enable_bot: boolean;
}

export interface Settings {
    /** 是否顯示目標生命訊息 */
    health: boolean;
    /** 可操控機器的人白名單 */
    whitelist: string[];
    /** 網頁顯示 */
    web: Web;
    /** DC相關設定 */
    discord: Discord;
    /** 攻擊相關設定 */
    attack: Attack;
}

const config: Config = require(`${process.cwd()}/config.json`);
const settings: Settings = require(`${process.cwd()}/settings.json`);

export {
    config,
    settings
};