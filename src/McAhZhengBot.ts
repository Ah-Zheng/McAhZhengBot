// Minecraft Plugin
import { createBot } from 'mineflayer';

// Utils
import utils from './utils';

const { config, settings } = utils.custom;

function connect(): void {
    const bot = createBot({
        host: config.server,
        username: config.mail,
        password: config.password,
        auth: config.auth
    });

    // 當機器人啟動時執行
    bot.on('spawn', () => {
        utils.plugins.showMineflayerViwer({
            bot,
            isShow: settings.show_viewer,
            firstPerson: settings.show_viewer_first_person
        });
        utils.plugins.showBackpack({
            bot,
            isShow: settings.show_backpack
        });
    });

    // 當收到訊息時執行
    bot.on('message', msg => {
        if (!settings.health && utils.validate.hasHealthMessage(msg.toString())) {
            return;
        }

        console.log(msg.toAnsi());
    });

    // 當機器人斷線時執行
    bot.once('end', () => {
        // TODO 斷線重連
    });
}

try {
    connect();
} catch (err) {
    console.log('err :>> ', err);
}
