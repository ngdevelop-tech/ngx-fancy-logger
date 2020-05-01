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

export interface HeaderConfig {
    color ?: string;
    fontSize ?: number;
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
  private DEFAULT_CONFIG = new LoggerConfig();
  private config: LoggerConfig;

  private levelPrefix = {};

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

  /** Reset to Default Configuration */
  resetConfig() {
    this.config = this.DEFAULT_CONFIG;
    this.setPrefix();
  }

  /** Display INFO level log */
  info(...args: any[]): void {
    this.log(LogLevel.INFO, 'log', ...args);
  }

  /** Display DEBUG level log */
  debug(...args: any[]): void {
    this.log(LogLevel.DEBUG, 'log', ...args);
  }

  /** Display WARNING Level log */
  warning(...args: any[]): void {
    this.log(LogLevel.WARNING, 'warn', ...args);
  }

  /** Display ERROR level log */
  error(...args: any[]): void {
    this.log(LogLevel.ERROR, 'error', ...args);
  }

  /** Display Header on Console, You can configure color and fontSize of header */
  header(title: string, config: HeaderConfig = {}) {
    const styles = `font-size: ${config.fontSize || 20}px; color:${config.color || 'steelblue'};   text-shadow: #ddd 2px 2px 2px`;
    console.log(`%c${title}`, styles);
  }
}
