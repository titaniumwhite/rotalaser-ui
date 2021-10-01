import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)



export default new Vuetify({
    icons: {
      iconfont: 'mdiSvg' || 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
      themes: {
        dark: {
          primary: colors.blue.lighten3,
          secondary: colors.pink.lighten2,
          accent: colors.shades.black,
          error: colors.red.accent3,   
          background: colors.shades.black
        },
        light: {
          primary: colors.blue.darken1,
          secondary: colors.pink.lighten1,
          accent: colors.shades.black,
          error: colors.red.accent3,        
        }
      },
      
    },
    sium:"sium"
})