import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/src/stylus/app.styl'// loooook it use bootstrap LTR, so it case issue in RTL. abdalhadi 2-9-2019.


let currentLangDirRTL=false;


Vue.use(Vuetify, {
    rtl: currentLangDirRTL,
    //rtl: false,
    theme: {
        primary: '#f6ad81',
        secondary: '#444054',
        accent: '#794c8a',
        error: '#d92550',
        info: '#78C3FB',
        success: '#3ac47d',
        warning: '#f7b924'
    },
    options: {
        customProperties: true
    },
    iconfont: 'md' || 'mdi',
})

