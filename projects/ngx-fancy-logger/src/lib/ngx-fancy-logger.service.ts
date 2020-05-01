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
  showEmoji ?= true;
  showLabel ?= true;
  disableLogs ?= false;
  levelColor?: {
    [logLevel: number]: string,
  } = {};
  levelEmogi?: {
    [logLevel: number]: string
  } = {};
}

const DEFAULT_LEVEL_COLORS = {
  [LogLevel.INFO]: 'steelblue',
  [LogLevel.DEBUG]: 'black',
  [LogLevel.WARNING]: 'orange',
  [LogLevel.ERROR]: 'red'
};

const DEFAULT_EMOJIS = {
  [LogLevel.INFO]: '🐬',
  [LogLevel.DEBUG]: '👨‍💻',
  [LogLevel.WARNING]: '👨‍🚀',
  [LogLevel.ERROR]: '😨'
};

@Injectable()
export class NgxFancyLoggerService implements AbstractNgxFancyLoggerService {
  DEFAULT_CONFIG = new LoggerConfig();
  config: LoggerConfig;

  levelPrefix = {};

  constructor(@Optional() private loggerConfig: LoggerConfig) {
    this.config = this.DEFAULT_CONFIG;
    this.updateConfig(loggerConfig);
  }

  private setPrefix() {
    if (this.config.disableLogs) {
      return;
    }
    for (const key in LogLevel) {
      if (!isNaN(Number(key))) {
        let prefix = this.config.showEmoji ? this.config.levelEmogi[key] || DEFAULT_EMOJIS[key] : '';
        if (this.config.showLabel) {
          prefix += LogLevel[key];
        }

        this.levelPrefix[key] = prefix;
      }
    }
  }

  private showTime = () => {
    return this.config.showTime ? ` > ${new Date().toLocaleString()}` : '';
  }

  private getStyles = (level: LogLevel) => `color:white;
                                            background-color:${this.config.levelColor[level] || DEFAULT_LEVEL_COLORS[level]};
                                            padding: 0px 2px;
                                            border-radius: 2px`

  /** Common Log Method */
  private log(level: LogLevel, method: string, ...args: any[]) {
    if (this.config.disableLogs || (level < this.config.logLevel)) {
      return;
    }
    console[method](`%c${this.levelPrefix[level]}${this.showTime()}`, this.getStyles(level), ...args);
  }

  /** Update configuration, it will override configuration done through forRoot or Default Config */
  updateConfig(loggerConfig: LoggerConfig | null | undefined) {
    this.config = { ...this.config, ...loggerConfig };
    this.setPrefix();
  }

  /** Reset Configuration to Default Configuration */
  resetConfig() {
    this.config = this.DEFAULT_CONFIG;
    this.setPrefix();
  }

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
}
