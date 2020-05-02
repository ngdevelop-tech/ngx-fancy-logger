import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFancyLoggerModule, LogLevel } from 'ngx-fancy-logger';
import { ExampleComponent } from './example/example.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxFancyLoggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
