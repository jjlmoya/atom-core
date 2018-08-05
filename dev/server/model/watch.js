/**
 * WATCH MODEL
 **/

var watch = {
    gender: '',
    //W/M/U
    brand: '',
    //VOSTOK
    mechanism: {
        type: '',
        //Mecánico, Automático, Quark, AutoQuark
        caliber: ''
        //nombre especifico
    },
    time: {
        display: [],
        //digital - analogic
        numbers: [],
        //roman, arabes, empty, index
        hourFormat: [],
        //12, 24, o 12 y 24
        watchHands: [],
        //s, m, h
        calendar: []
        //d, wd, m, y
    },
    wristband: {
        material: [],
        //piel, silicona
        closure: [],
        //boton, hebilla
        color: [],
        size: 0
    },
    dial: {
        size: {
            diameter: 0,
            depth: 0,
            height: 0,
            width: 0
        },
        hardener: false,
        material: [],
        //perla o nada
        color: []
    },
    glass: {
        material: [],
        curvature: false,
        antiReflective: false
    },
    batteryTime: 0,
    //ms
    weight: 0,
    //g
    case: {
        material: [],
        //acero, aluminio, carbono, plástico
        coating: [],
        //pvd, ip, ...
        coatingColor: [],
        rotateBezel: false,
        crown: {
            type: '',
            //screw, pusher
            size: 0
            //mm

        },
        back: {
            isTransparent: false,
            type: ''
            //screw in
        }
    },

    cronograph: {
        has: false,
        maxTime: 60,
        quickReset: false
    },
    resistance: {
        shock: false,
        water: {
            has: false,
            meters: 0,
            pressure: 0
        },
        magnetism: false

    },
    illumination: {
        has: false,
        type: []
    },
    extra: {
        hasSolarPower: false,
        isSmartWatch: false,
        hasShockProtection: false,
        hasSpecialPackage: false,
        hasAltimeter: false,
        hasAlarm: false,
        hasCompass: false,
        hasWorldTime: false,
        hasTimer: false,
        tachymeter: false,
        hasMoonPhases: false
    },
    madeIn: '',
    warranty: 0,

    //years

    //ecommerce
    images: [],
    title: '',
    description: '',
    article: 'html',
    price: 0,
    discount: 0,
    slug: 0,
    stock: 0
}