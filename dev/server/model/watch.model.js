const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WatchSchema = new Schema({
    ecommerce: {
        image: {data: Buffer, contentType: String},
        title: {type: String, required: true},
        description: {type: String, required: true},
        article: {type: String},
        price: 0,
        discount: {type: Number},
        slug: {type: String, required: true, lowercase: true},
        stock: 0
    },
    gender: {type: String, required: true, lowercase: true, default: 'u'}, //W/M/U
    brand: {type: String, required: true}, //VOSTOK
    mechanism: {
        type: {type: String, required: true}, //Mecánico, Automático, Quark, AutoQuark
        caliber: {type: String, required: true}, //nombre especifico
    },
    time: {
        display: [String], //digital-analogic
        numbers: [String], //roman, arabes, empty, index
        hourFormat: [Number], //12, 24, o 12 y 24
        watchHands: [String], //s, m, h
        calendar: [String] //d, wd, m, y
    },
    wristband: {
        material: [String], //piel, silicona
        closure: {type: String, required: true}, //boton, hebilla
        color: [String],
        size: [Number]
    },
    dial: {
        size: {
            diameter: {type: Number},
            depth: {type: Number},
            height: {type: Number},
            width: {type: Number}
        },
        hardener: {type: Boolean},
        material: [String],
        color: [String]
    },
    glass: {
        material: [],
        curvature: {type: Boolean},
        antiReflective: {type: Boolean}
    },
    case: {
        material: [],
        coating: [],
        coatingColor: [],
        rotateBezel: {type: Boolean},
        crown: {
            type: {type: String},
            size: {type: Number}
        },
        back: {
            isTransparent: {type: Boolean},
            type: {type: String}
        }
    },
    properties: {
        batteryTime: {type: Number},
        weight: {type: Number},
        madeIn: {type: String},
        warranty: {type: Number}
    },
    cronograph: {
        has: {type: Boolean, required: true, default: false},
        maxTime: {type: Number}, //minutes
        quickReset: {type: Boolean, required: true, default: false}
    },
    resistance: {
        shock: {type: Boolean, required: true, default: false},
        water: {
            has: {type: Boolean, required: true, default: false},
            meters: {type: Number},
            pressure: {type: Number}
        },
        magnetism: {type: Boolean, required: true, default: false}
    },
    illumination: {
        has: {type: Boolean, required: true, default: false},
        type: []
    },
    extra: {
        hasSolarPower: {type: Boolean, required: true, default: false},
        isSmartWatch: {type: Boolean, required: true, default: false},
        hasShockProtection: {type: Boolean, required: true, default: false},
        hasSpecialPackage: {type: Boolean, required: true, default: false},
        hasAltimeter: {type: Boolean, required: true, default: false},
        hasAlarm: {type: Boolean, required: true, default: false},
        hasCompass: {type: Boolean, required: true, default: false},
        hasWorldTime: {type: Boolean, required: true, default: false},
        hasTimer: {type: Boolean, required: true, default: false},
        tachymeter: {type: Boolean, required: true, default: false},
        hasMoonPhases: {type: Boolean, required: true, default: false}
    },
});

module.exports = mongoose.model('Watch', WatchSchema);
