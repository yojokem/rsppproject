const logger = require("../config/winston")().logger;
const path = require("path");

const DEFAULT_LANG = "en";

let current_LANG = process.env.LANG || process.env.LANGUAGE || DEFAULT_LANG;
let def = require("./file/" + DEFAULT_LANG + "/index");

let lang = def, pk = false;
try {
    lang = require("./file/" + current_LANG + "/index");
    pk = true;
} catch (error) {
    logger.error("Targeted language is not supported. Conversed into English.");
}

if(pk) {
    // 보정
    let keys = Object.keys(def);
    let keys0 = Object.keys(lang);
    for(var i in keys) {
        let key = keys[i];
        if(!keys0.includes(key)) lang[key] = def[key];
    }
}

let keys = Object.keys(lang);

module.exports = r => keys.includes(r) ? lang[r] : "[ANY MESSAGE HAS BEEN FOUND (LANGUAGE " + current_LANG + ")]";