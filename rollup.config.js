export default {
	entry: './dist/index.js',
	dest: './dist/bundles/openid-connect.umd.js',
	format: 'umd',
	moduleName: 'ng-log-service',
	globals: {
		'@angular/core': 'ng.core',
		'@ngrx/core': 'ngrx.core',
		'rxjs/Observable': 'Rx',
		'rxjs/BehaviorSubject': 'Rx',
		'rxjs/Subscriber': 'Rx',
		'rxjs/scheduler/queue': 'Rx.Scheduler',
		'rxjs/operator/observeOn': 'Rx.Observable.prototype',
		'rxjs/operator/scan': 'Rx.Observable.prototype',
		'rxjs/operator/withLatestFrom': 'Rx.Observable'
	}
}