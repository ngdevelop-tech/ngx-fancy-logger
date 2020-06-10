import { Component, OnInit } from '@angular/core';
import { LogLevel, NgxFancyLoggerService, LoggerConfig } from 'ngx-fancy-logger';
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  config: LoggerConfig = {
    showTime: true,
    logLevel: LogLevel.INFO,
    showEmoji: true,
    showLabel: true,
    disableLogs: false,
    levelColor: {
      [LogLevel.DEBUG]: 'black',
      [LogLevel.INFO]: 'steelblue',
      [LogLevel.WARNING]: 'orange',
      [LogLevel.ERROR]: 'red'
    },
    levelEmoji: {
      [LogLevel.DEBUG]: '👨‍💻',
      [LogLevel.INFO]: '🐬',
      [LogLevel.WARNING]: '⚡',
      [LogLevel.ERROR]: '😨'
    }
  };

  levels = Object.keys(LogLevel).filter(l => isNaN(Number(l)));
  logLevels = Object.keys(LogLevel).filter(l => !isNaN(Number(l)));
  logLevelEnum = LogLevel;

  constructor(private logger: NgxFancyLoggerService) {
    logger.header('Example Component');
  }

  ngOnInit(): void {
  }

  updateConfig() {
    this.logger.updateConfig(this.config);
    this.logger.info('Config Updated...');
  }

  showHeader(value: any) {
    this.logger.header(value.message, { color: value.color, fontSize: value.fontSize });
  }

  showLog(logLevel: LogLevel, value: any) {
    try {
      const data = value.isJSON ? JSON.parse(value.data) : value.data;

      switch (logLevel) {
        case LogLevel.DEBUG: this.logger.debug(data); break;
        case LogLevel.INFO: this.logger.info(data); break;
        case LogLevel.WARNING: this.logger.warning(data); break;
        case LogLevel.ERROR: this.logger.error(data); break;
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.logger.error('Invalid JSON Object.');
      }
    }
  }

}
