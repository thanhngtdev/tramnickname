import ColorCode from './ColorCode';

const Constants = {
    StorageKey: {
        KEY_TOKEN: 'SAVED_TOKEN_KEY',
        KEY_USER_INFO: 'USER_INFO',
        KEY_FIRST_USE: 'KEY_FIRST_USE',
    },
    MARGIN_HOZ: 24,
    TABBAR_HEIGHT: 80,
    BORDER_RADIUS: 24,
    FONT_HEAVY: 'FranklinGothicURW-Hea',
    FONT_BOOK: 'FranklinGothicURW-Boo',
    FONT_DEMI: 'FranklinGothicURW-Dem',
    TEXT_COLOR: ColorCode.White,
    SPINNER_COLOR: ColorCode.White,

    DEFAULT_LOCATION : {
        lat: 51.5,
        lng: -0.3,
    },

    STATUS_PERMISSION_LOCATION: {
        PROMPT: "prompt",
        GRANTED: "granted",
        DENIED: "denied"
    }
};

export default Constants;
