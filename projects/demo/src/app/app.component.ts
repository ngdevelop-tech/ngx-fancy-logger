import { Component } from '@angular/core';
import { NgxFancyLoggerService, LogLevel } from 'ngx-fancy-logger';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private logger: NgxFancyLoggerService) {
    logger.header('This is a Ngx Fancy Logger Demo', { color: 'red', fontSize: 30 });
  }

}
