'use strict';

class LocaleService {

    constructor(defaultLocale, localeChangeCallback) {
        this.locale = defaultLocale;
        this.callback = localeChangeCallback;
    }

    getLocale() {
        return this.locale;
    }

    setLocale(newLocale) {
        this.locale = newLocale;
        this.callback();
    }
}

export default LocaleService;