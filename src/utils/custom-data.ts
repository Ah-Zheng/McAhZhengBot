export interface Config {
    server: string;
    port?: number;
    mail: string;
    password: string;
    language: 'zh-tw' | 'en';
    auth: 'microsoft' | 'mojang'
}

export interface Settings {
    // 是否顯示目標生命訊息
    health: boolean;
    // 是否開啟查看背包服務
    show_backpack: boolean;
    // 是否開啟查看機器人當前畫面
    show_viewer: boolean;
    // 是否以第一人稱查看機器人當前畫面
    show_viewer_first_person: boolean;
}

const config: Config = require(`${process.cwd()}/config.json`);
const settings: Settings = require(`${process.cwd()}/settings.json`);

export default {
    config,
    settings
}