import TButton from '../components/kits/t-button/index.vue'
import TButtons from '../components/kits/t-buttons/index.vue'

export default {
  install(app) {
    app.component('TButton', TButton)
    app.component('TButtons', TButtons)
  },
}
