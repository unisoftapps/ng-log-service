import { ILogListener, LogLevel, ILogMessage, GroupCommand } from "../log-types";
import { ALL } from "../log-observer.service";

export class ExtensionListener implements ILogListener {

    onGroupCommand(namespace: string, type: GroupCommand, label?: string): void {
        throw new Error("Method not implemented.");
    }
    namespace = ALL; // what namespace you want to listen for
    level = LogLevel.All; // log level

    onLog(namespace: string, level: LogLevel, logMessage: ILogMessage) {
        var event = new CustomEvent('logMonitorEvent', {
            detail: {
                message: logMessage.message,
                namespace: namespace,
                level: level,
                data: logMessage.obj
            }
        });
        setTimeout(() => {
            window.dispatchEvent(event);
        }, 0);
    }

}