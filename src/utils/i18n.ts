import i18n from 'i18n';
import path from 'path';

i18n.configure({
    locales: ['zh-tw'],
    defaultLocale: 'zh-tw',
    queryParameter: 'language',
    directory: path.join('./', 'language')
});

export default i18n;