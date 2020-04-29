import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxFancyLoggerComponent } from './ngx-fancy-logger.component';
import { LoggerConfig, LogLevel, NgxFancyLoggerService } from './ngx-fancy-logger.service';


@NgModule({
  declarations: [NgxFancyLoggerComponent],
  imports: [
  ],
  exports: [NgxFancyLoggerComponent],
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
