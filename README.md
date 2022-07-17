# McAhZhengBot

## 掛機Bot
為廢土伺服器所製作的機器人

## 開發
- 套件管理使用`pnpm`
- Node版本`>= 16`
- 使用`TypeScript`

## 功能
```
=== 已實作項目 ===

- 可透過終端機輸入帳號登入
- 查看機器人背包內容
- 查看機器人當前畫面(可選是否使用第一人稱)
- 透過指令查詢機器人資訊
- 自動攻擊
- 主動接受 tpa 和 tpahere
- 透過私訊機器人執行指令
- 重啟後傳送至指定公傳
- 透過「Discord 頻道」對機器人執行指令

=== 計畫中項目 ===

- 透過私訊「Discord BOT」對機器人執行指令
- 推播訊息
- 存綠寶石
- 與村民交易
```

## 指令
```
指令前綴'#', ex: #info

info      // 查詢機器人相關資訊
exp       // 查詢經驗
balance   // 查詢當前餘額
heldItem  // 查詢手持物品
backpack  // 查看機器人背包內容
viewer    // 查看機器人當前畫面
sword     // 裝備劍
restart   // 手動重啟

=== 本地終端機可用 ===
#info
#exp
#balance
#heldItem
#backpack
#viewer
#sword

ex: #info

=== 遊戲內私訊可用 ===
/m {botID} exp
/m {botID} heldItem
/m {botID} sword
/m {botID} restart

=== Discord 可用 ===
#info
#exp
#heldItem
#sword
#restart
```

## config.json

若`username`及`password`為空，則可在終端機輸入帳號及密碼來做登入驗證

```
{
    "server": "mcfallout.net",
    "port": 25565,
    "version": "1.18.2",
    "username": "可留白",
    "password": "可留白",
    "language": "zh-tw",
    "auth": "microsoft"
}
```

## settings.json
```
{
    "health": false,                            // 是否顯示目標血量訊息
    "whitelist": [],                            // 指令白名單
    "web": {                                    === web 服務相關設定 ===
        "backpack": true,                       // 是否啟用背包查看服務
        "backpack_port": 3000,                  // 背包查看服務 port
        "viewer": false,                        // 是否啟用查看當前畫面服務
        "viewer_port": 3007,                    // 查看當前畫面服務 port
        "viewer_first_person": false            // 是否使用第一人稱查看當前畫面
    },
    "discord": {                                === Discord 相關設定 ===
        "token": ""                             // 機器人 token
        "user_id": "",                          // 使用者ID
        "channel_id": "",                       // 頻道ID
        "enable_bot": false,                    // 是否啟用 Discord 機器人
        "enable_send_to_channel": true,         // 是否啟用傳送訊息至頻道
    },
    "attack": {                                 === 攻擊相關設定 ===
        "auto": true,                           // 是否啟用自動攻擊
        "interval_ticks": 10,                   // 攻擊循環時間
        "enable_detect_interrupt": true,        // 是否啟用偵測攻擊中斷
        "check_target_cycle_time": 30,          // 偵測攻擊中斷循環時間(秒)
        "list": []                              // 攻擊的目標清單
    },
    "restart": {                                === 重啟相關設定 ===
        "wait_time": 5,                         // 重啟等待時間
        "enable_teleport": true,                // 是否啟用重啟後傳送至指定公傳
        "public_teleportation_id": ""           // 公傳ID
    }
}
```
