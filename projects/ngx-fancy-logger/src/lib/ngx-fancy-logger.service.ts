import { Injectable, Optional } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';
export enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
}

export abstract class AbstractNgxFancyLoggerService {
  abstract debug(...args: any[]): void;
  abstract info(...args: any[]): void;
  abstract warning(...args: any[]): void;
  abstract error(...args: any[]): void;
}

export class LoggerConfig {
  showTime ?= true;
  logLevel ?= LogLevel.DEBUG;
  showEmoji ?= true;
  showLabel ?= true;
  disableLogs ?= false;
  levelColor?: {
    [logLevel: number]: string,
  } = {};
  levelEmoji?: {
    [logLevel: number]: string
  } = {};
}

export interface HeaderConfig {
    color ?: string;
    fontSize ?: number;
}

const DEFAULT_LEVEL_COLORS = {
  [LogLevel.DEBUG]: 'black',
  [LogLevel.INFO]: 'steelblue',
  [LogLevel.WARNING]: 'orange',
  [LogLevel.ERROR]: 'red'
};

const DEFAULT_EMOJIS = {
  [LogLevel.DEBUG]: '👨‍💻',
  [LogLevel.INFO]: '🐬',
  [LogLevel.WARNING]: '⚡',
  [LogLevel.ERROR]: '😨'
};

@Injectable({
  providedIn: 'root'
})
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
        let prefix = this.config.showEmoji ? this.config.levelEmoji[key] || DEFAULT_EMOJIS[key] : '';
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
  private log(level: LogLevel, ...args: any[]) {
    let method = 'log';
    switch (level) {
      case LogLevel.WARNING: method = 'warn'; break;
      case LogLevel.ERROR: method = 'error'; break;
    }

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

  /** Display DEBUG level log */
  debug(...args: any[]): void {
    this.log(LogLevel.DEBUG, ...args);
  }

  /** Display INFO level log */
  info(...args: any[]): void {
    this.log(LogLevel.INFO, ...args);
  }

  /** Display WARNING Level log */
  warning(...args: any[]): void {
    this.log(LogLevel.WARNING, ...args);
  }

  /** Display ERROR level log */
  error(...args: any[]): void {
    this.log(LogLevel.ERROR, ...args);
  }

  /** Display Header on Console, You can configure color and fontSize of header */
  header(title: string, config: HeaderConfig = {}) {
    const styles = `font-size: ${config.fontSize || 20}px; color:${config.color || 'steelblue'};   text-shadow: #ddd 2px 2px 2px`;
    console.log(`%c${title}`, styles);
  }

  /** RxJS Debug Operator to generate Log */
  debugOperator = <T>(message?: string, logLevel = LogLevel.DEBUG): MonoTypeOperatorFunction<T> => tap(data => {
    this.log(logLevel, message || '', data);
  })

}
