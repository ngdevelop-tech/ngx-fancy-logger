import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFancyLoggerModule, LogLevel } from 'ngx-fancy-logger';
import { ExampleComponent } from './example/example.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'demo', component: ExampleComponent},
  {path: '**', redirectTo : 'home'},
];

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    HomeComponent,
    CodeSnippetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgxFancyLoggerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
