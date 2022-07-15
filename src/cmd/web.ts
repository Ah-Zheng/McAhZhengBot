import { Settings } from '../customData';
import { msgTmp, i18n } from '../utils';
import open from 'open';

function openBackpack(settings: Settings) {
    settings.web.backpack
        ? open(`http://127.0.0.1:${settings.web.backpack_port}`)
        : console.log(`${msgTmp.sys} ${i18n.__('S_DISABLE_CHECK_BACKPACK')}`);
}

function openViewer(settings: Settings) {
    settings.web.viewer
        ? open(`http://127.0.0.1:${settings.web.viewer_port}`)
        : console.log(`${msgTmp.sys} ${i18n.__('S_DISABLE_CHECK_VIEWER')}`);
}

export default {
    openBackpack,
    openViewer
};
