import { Injectable, EventEmitter, Inject } from '@angular/core';
import { ILog, LogLevel, ILogEvent, GroupCommand } from './log-types';
import { LogObserverService } from './log-observer.service';

@Injectable()
export class LogService implements ILog {

	// namespace for logging
	private _ns: string;

	constructor(private logObserver: LogObserverService) { }

	set namespace(ns: string) {
		this._ns = ns;
	}

	get namespace(): string {
		return this._ns;
	}

	public logDeferred(level: LogLevel, action: ILogEvent) {
		this.logObserver.onDidLog(this._ns, level, action);
	};

	public group(label: string): void {
		this.logObserver.groupCommand(this.namespace, GroupCommand.GroupStart, label);
	}

	public groupCollapsed(label: string) {
		this.logObserver.groupCommand(this.namespace, GroupCommand.GroupCollapsed, label);
	}

	public groupEnd(): void {
		this.logObserver.groupCommand(this.namespace, GroupCommand.GroupEnd);
	}

	public log(arg: string, obj: any = null, level: LogLevel = LogLevel.All) {
		this.logObserver.onDidLog(this._ns, level, () => {
			return {
				message: arg,
				obj: obj
			}
		});
	}

	public debug(arg: string, obj: any = null, level: LogLevel = LogLevel.Debug) {
		this.logObserver.onDidLog(this._ns, level, () => {
			return {
				message: arg,
				obj: obj
			}
		});
	}

	public info(arg: string, obj: any = null, level: LogLevel = LogLevel.Info) {
		this.logObserver.onDidLog(this._ns, level, () => {
			return {
				message: arg,
				obj: obj
			}
		});
	}

	public warn(arg: string, obj: any = null, level: LogLevel = LogLevel.Warn) {
		this.logObserver.onDidLog(this._ns, level, () => {
			return {
				message: arg,
				obj: obj
			}
		});
	}

	public error(arg: string, obj: any = null, level: LogLevel = LogLevel.Error) {
		this.logObserver.onDidLog(this._ns, level, () => {
			return {
				message: arg,
				obj: obj
			}
		});
	}

	public fatal(arg: string, obj: any = null, level: LogLevel = LogLevel.Fatal) {
		this.logObserver.onDidLog(this._ns, level, () => {
			return {
				message: arg,
				obj: obj
			}
		});
	}
}
