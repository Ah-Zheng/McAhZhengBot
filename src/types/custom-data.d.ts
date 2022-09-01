declare namespace CustomData {
    interface Config {
        /** 伺服器IP */
        host: string;
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

    interface Web {
        /** 是否開啟查看背包服務 */
        backpack: boolean;
        /** 查看背包服務 port */
        backpack_port: number;
        /** 是否開啟查看機器人當前畫面 */
        viewer: boolean;
        /** 查看當前畫面服務 port */
        viewer_port: number;
        /** 是否以第一人稱查看機器人當前畫面 */
        viewer_first_person: boolean;
    }

    interface Attack {
        /** 是否自動攻擊 */
        auto: boolean;
        /** 攻擊頻率 */
        interval_ticks: number;
        /** 是否啟用偵測中斷攻擊 */
        enable_detect_interrupt: boolean;
        /** 偵測中斷攻擊的循環時間 */
        check_target_cycle_time: number;
        /** 攻擊清單 */
        list: string[];
    }

    interface Discord {
        /** 是否啟用DC Bot */
        enable_bot: boolean;
        /** 是否啟用發送訊息到頻道的功能 */
        enable_send_to_channel: boolean;
        /** Discord Bot Token  */
        token: string;
        /** 頻道ID */
        channel_id: string;
        /** 用戶ID */
        user_id: string;
    }

    interface Restart {
        /** 重啟等待時間 */
        wait_time: number;
        /** 是否啟用重啟後傳送回指定公傳 */
        enable_teleport: boolean;
        /** 指定公傳ID */
        public_teleportation_id: string;
    }

    interface Settings {
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
        /** 重啟相關設定 */
        restart: Restart;
    }
}