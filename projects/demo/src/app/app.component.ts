import { Component } from '@angular/core';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  constructor(private logger: NgxFancyLoggerService) {
    logger.info('INFO Log', 123, { a: 20, b: 30 });
    logger.debug('Debug Log', { a: 20, b: 30 });
    logger.warning('Warning Log', { a: 20, b: 30 });
    logger.error('Error Log', { a: 20, b: 30 });
  }
}
