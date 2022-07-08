const path = require('path');
const i18n = require('i18n');

import custom from './custom-data';
import msgTmp from './message-tmp';

const message = ['zh-tw'];

const langExist = !~message.indexOf(custom.config.language);

if (!langExist) {
    console.log(`${msgTmp.sys} 尚未支援${custom.config.language}`);
}

i18n.configure({
    locales: ['zh-tw'],
    defaultLocale: langExist ? custom.config.language : 'zh-tw',
    directory: path.resolve(`${process.cwd()}/lang`)
});

export default i18n;