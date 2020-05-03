import { Component } from '@angular/core';
import { NgxFancyLoggerService, LogLevel } from 'ngx-fancy-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  EXTERNAL_URL = {
    git: 'https://github.com/ngdevelop-tech/ngx-fancy-logger',
    npm: 'https://www.npmjs.com/package/ngx-fancy-logger',
    ngdevelop: 'https://www.ngdevelop.tech/blog/',
    twitter: 'https://twitter.com/ankit26895'
  };

  constructor(private logger: NgxFancyLoggerService) {
    logger.header('This is a Ngx Fancy Logger Demo', { color: 'red', fontSize: 30 });
  }

}
