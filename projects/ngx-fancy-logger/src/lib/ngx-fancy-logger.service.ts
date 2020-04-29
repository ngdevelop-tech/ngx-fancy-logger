import { Injectable, Optional } from '@angular/core';

export enum LogLevel {
  INFO,
  DEBUG,
  WARNING,
  ERROR,
}

export abstract class AbstractNgxFancyLoggerService {
  abstract info(...args: any[]): void;
  abstract debug(...args: any[]): void;
  abstract warning(...args: any[]): void;
  abstract error(...args: any[]): void;
}

export class LoggerConfig {
  showTime ?= true;
  logLevel ?= LogLevel.INFO;
  levelColor ?: {
    [logLevel: number]: string,
  }  = {};
}

const DEFAULT_LEVEL_COLORS = {
  [LogLevel.INFO] : 'steelblue',
  [LogLevel.DEBUG] : 'black',
  [LogLevel.WARNING] : 'orange',
  [LogLevel.ERROR]: 'red'
};


@Injectable()
export class NgxFancyLoggerService implements AbstractNgxFancyLoggerService {
  config: LoggerConfig;
  DEFAULT_CONFIG = new LoggerConfig();
  constructor(@Optional() private loggerConfig: LoggerConfig) {
    this.config = {...this.DEFAULT_CONFIG, ...loggerConfig};
  }

  private showTime = () => {
    return this.config.showTime ? ` > ${new Date().toLocaleString()}` : '';
  }

  private getStyles = (level: LogLevel) => `color:white;
                                            background-color:${this.config.levelColor[level] || DEFAULT_LEVEL_COLORS[level]};
                                            padding: 0px 2px;
                                            border-radius: 2px`

  info(...args: any[]): void {
    this.log(LogLevel.INFO, 'log', args);
  }
  debug(...args: any[]): void {
    this.log(LogLevel.DEBUG, 'log', args);
  }
  warning(...args: any[]): void {
    this.log(LogLevel.WARNING, 'warn', args);
  }
  error(...args: any[]): void {
    this.log(LogLevel.ERROR, 'error', args);
  }

  private log(level: LogLevel, method: string, ...args: any[] ){
    if (level < this.config.logLevel) {
      return;
    }
    console[method](`%c${LogLevel[level]}${this.showTime()}`, this.getStyles(level), ...args);
  }
}
