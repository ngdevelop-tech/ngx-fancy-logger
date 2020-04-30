import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoggerConfig, LogLevel, NgxFancyLoggerService } from './ngx-fancy-logger.service';


@NgModule({
  imports: [],
  providers: [NgxFancyLoggerService]
})
export class NgxFancyLoggerModule {
  static forRoot(config: LoggerConfig | null | undefined): ModuleWithProviders<NgxFancyLoggerModule> {
    return {
      ngModule: NgxFancyLoggerModule,
      providers: [
        { provide: LoggerConfig, useValue: config || {} },
        NgxFancyLoggerService
      ]
    };
  }
}
