import { Component, OnInit } from '@angular/core';
import { LogLevel } from 'ngx-fancy-logger';
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  levels = Object.keys(LogLevel).filter(l => isNaN(Number(l)));
  logLevels = Object.keys(LogLevel).filter(l => !isNaN(Number(l)));
  logLevelEnum = LogLevel;
  constructor() { }

  ngOnInit(): void {
  }

}
