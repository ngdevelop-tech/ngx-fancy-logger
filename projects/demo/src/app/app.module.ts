import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFancyLoggerModule } from 'ngx-fancy-logger';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFancyLoggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
