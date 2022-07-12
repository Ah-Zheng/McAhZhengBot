import i18n from 'i18n';
import path from 'path';

i18n.configure({
    locales: ['zh-tw'],
    defaultLocale: 'zh-tw',
    queryParameter: 'lang',
    directory: path.join('./', 'lang')
});

export default i18n;