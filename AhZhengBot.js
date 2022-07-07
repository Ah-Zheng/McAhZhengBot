const mineflayer = require('mineflayer');
const inventoryViwer = require('mineflayer-web-inventory');
const mineflayerViewer = require('prismarine-viewer').mineflayer

const openWeb = require('open');

const config = require(`${process.cwd()}/config.json`);
const settings = require(`${process.cwd()}/settings.json`);

const options = {
    host: config.server,
    username: config.mail,
    password: config.password,
    auth: config.auth
};

try {
    const bot = mineflayer.createBot(options);

    bot.on('spawn', () => {
        if (settings.show_viwer) {
            // 顯示機器人當前的畫面
            mineflayerViewer(bot, {
                port: 3007,
                firstPerson: settings.show_viwer_first_person
            });
            openWeb('http://localhost:3007');
        }
    });
    bot.on('message', msg => {
        const health = new RegExp(/目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g); //清除目標生命

        if (!settings.health && health.test(msg.toString())) {
            return;
        }

        console.log(msg.toAnsi());

        if (msg.toString().includes('取統計資料成功')) {
            if (settings.show_backpack) {
                // 顯示機器人背包
                inventoryViwer(bot);
                openWeb('http://localhost:3000');
            }
        }
    });
} catch (err) {
    console.log('err :>> ', err);
}
