import { Injectable } from '@angular/core';
import { ALL } from '../log-observer.service';
import { LogLevel, ILogListener, ILogMessage, GroupCommand } from '../log-types';

export interface IConsoleListenerPrefix {
    (): string;
}

export class ConsoleListenerConfig {
    prefixLogsWithNamespace: boolean = true;
    namespaceWhiteList: Array<string> = [ALL];
    enabled: boolean = true;
    logLevel: LogLevel;
    prefix: IConsoleListenerPrefix;
    enablePrefix: boolean = false;
}

let defaultConfig = {
    prefixLogsWithNamespace: true,
    namespaceWhiteList: [ALL],
    enabled: true,
    prefix: () => {
        return "";
    },
    enablePrefix: true,
    logLevel: LogLevel.All
}

export class ConsoleListener implements ILogListener {

    namespace = ALL;
    level = LogLevel.All;

    constructor(private config: ConsoleListenerConfig) {
        // merge default config with config 
        this.setConfig(config);
    }

    setConfig(config: ConsoleListenerConfig) {
        this.config = Object.assign(defaultConfig, config);
        this.level = this.config.logLevel;
    }

    // returns copy of config
    getConfig(): ConsoleListenerConfig {
        return Object.assign({}, this.config);
    }

    onGroupCommand(namespace: string, type: GroupCommand, label?: string): void {

        if (!this.config.enabled) {
            return;
        }

        if (!this.inWhitelist(namespace)) {
            return;
        }

        switch (type) {
            case GroupCommand.GroupStart:
                console.group(label);
                break;
            case GroupCommand.GroupCollapsed:
                console.groupCollapsed(label);
                break;
            case GroupCommand.GroupEnd:
                console.groupEnd();
        }
    }

    onLog(namespace: string, level: LogLevel, logMessage: ILogMessage) {
        if (!this.config.enabled) {
            return false;
        }

        if (!this.inWhitelist(namespace)) {
            return false;
        }

        if (level < this.config.logLevel) {
            return false;
        }


        var prefix = this.prefix(namespace);
        if (this.config.prefixLogsWithNamespace) {
            prefix += namespace + ': ';
        }

        var log = prefix + logMessage.message;

        switch (level) {
            case LogLevel.Debug:
                console.debug(log, logMessage.obj);
                break;
            case LogLevel.Info:
                console.info(log, logMessage.obj);
                break;
            case LogLevel.Warn:
                console.warn(log, logMessage.obj);
                break;
            case LogLevel.Error:
            case LogLevel.Fatal:
                console.error(log, logMessage.obj);
                break;
            case LogLevel.All:
            default:
                console.log(log, logMessage.obj);
                break;
        }
    }

    private prefix(namespace: string): string {
        if (!this.config.enablePrefix) {
            return "";
        }
        var prefix = this.config.prefix();
        return prefix;
    }

    private inWhitelist(namespace: string): boolean {

        if (this.config.namespaceWhiteList.indexOf(ALL) !== -1) {
            return true;
        }

        if (this.config.namespaceWhiteList.indexOf(namespace) !== -1) {
            return true;
        }

        return false;
    }
}