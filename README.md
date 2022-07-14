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

- 查看機器人背包內容
- 查看機器人當前畫面(可選是否使用第一人稱)
- 透過指令查詢機器人資訊
- 自動攻擊

=== 計畫中項目 ===

- 主動接受 tpa 和 tpahere
- 透過私訊機器人執行指令
- 透過 Discord Bot 對機器人執行指令
```

## 指令
```
指令前綴'#', ex: #info

#info      // 查詢機器人相關資訊
#exp       // 查詢經驗
#balance   // 查詢當前餘額
#heldItem  // 查詢手持物品
#backpack  // 查看機器人背包內容
#viewer    // 查看機器人當前畫面
#sword     // 裝備劍
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
    "health": false,                    // 是否顯示目標血量訊息
    "whitelist": [],                    // 指令白名單
    "web": {                            === web 服務相關設定 ===
        "backpack": true,               // 是否啟用背包查看服務
        "backpack_port": 3000,          // 背包查看服務 port
        "viewer": false,                // 是否啟用查看當前畫面服務
        "viewer_port": 3007,            // 查看當前畫面服務 port
        "viewer_first_person": false    // 是否使用第一人稱查看當前畫面
    },
    "discord": {                        === Discord 相關設定(未開放) ===
        "token": ""                     // 機器人 token
        "enable_bot": false,            // 是否啟用 Discord 機器人
        "enable_send_to_channel": true, // 是否啟用傳送訊息至頻道
    },
    "attack": {                         === 攻擊相關設定 ===
        "auto": true,                   // 是否啟用自動攻擊
        "interval_ticks": 10,           // 攻擊循環時間
        "list": []                      // 攻擊的目標列表
    }
}
```
