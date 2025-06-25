import { boot } from 'quasar/wrappers';

import emitter from 'tiny-emitter/instance'

export default boot( async ({ app, router, store }) => {

	app.config.globalProperties.$global = {
		$on: (...args) => emitter.on(...args),
		$once: (...args) => emitter.once(...args),
		$off: (...args) => emitter.off(...args),
		$emit: (...args) => emitter.emit(...args)
	}

	// how to use
	// $global.$on('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');
	// $global.$once('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');
	// $global.$off('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');
	// $global.$emit('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');

	// nama-event yang sama akan saling berkomunikasi

});

