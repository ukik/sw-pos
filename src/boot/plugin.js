import { defineBoot } from '#q-app/wrappers'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineBoot(({ app }) => {
  // app.config.globalProperties.$axios = axios

  app.use(VueSweetalert2);
})
