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
    logger.info('This is a INFO log', 123, { a: 20, b: 30 });
    logger.debug('This is a DEBUG Log', { a: 20, b: 30 });
    logger.warning('This is a WARNING Log', { a: 20, b: 30 });
    logger.error('This is an ERROR Log', { a: 20, b: 30 });
  }
}
