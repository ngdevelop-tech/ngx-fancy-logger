# NgxFancyLogger Documentation

NGX-FANCY-LOGGER is a console logger for angular applications. It provides various features like log level labels, log level emoji, time and so on etc.

It supports Angular v6 and above.

# [NgxFancyLogger HomePage](https://ngx-fancy-logger.netlify.app/) | [NgxFancyLogger Demo](https://ngx-fancy-logger.netlify.app/#/demo) 


## Key Features

- Different Log Levels (INFO=0, DEBUG=1, WARNING=2, ERROR=3).
- Log Levels are displayed in Label form with assigned color style or default colors.
- Show/Hide Time
- Show/Hide Emogi for each Log Level
- Show Header on console (`color` and `fontSize` configurable)
- Debug RxJS Observable Stream using `debugOperator()` operator function  
- Can configure each setting with `LoggerConfig` in `forRoot` (which allows us to configure `environment` specific configuration) or using `updateConfig()` method.
- Reset configuration using `resetConfig()` method
- Environment Specific Log Level Restriction.
    eg. if you set `logLevel` to `WARNING`, it will only show logs for `WARNING` and `ERROR`. 
- Can configure Log Level Colors and Emojis.
- Can Disable all logs

## Installation

`npm install --save ngx-fancy-logger`

Once it is installed add it in `AppModule`. 

#### With Default Configuration

To use `NgxFancyLoggerModule` with Default configuration you just need to import it in `@NgModule`. No need to call `.forRoot()` method
```
import { NgxFancyLoggerModule } from 'ngx-fancy-logger';

@NgModule({
  ...
  imports: [
    ...
    NgxFancyLoggerModule
  ]
  ...
})
export class AppModule { }

```
#### Override Default Configuration
You can override `NgxFancyLoggerModule` default configuration with `forRoot` method, as below. Each configuration is optional.
> Overriding default configuration allows us to set environment specific configuration. 
> We can add `loggerConfig` in `environment.ts` (environment specific file) and use it as `NgxFancyLoggerModule.forRoot(environment.loggerConfig)` in Module   

```
import { NgxFancyLoggerModule, LogLevel } from 'ngx-fancy-logger';

@NgModule({
  ...
  imports: [
    ...
    NgxFancyLoggerModule.forRoot({
        showTime: false,
        logLevel: LogLevel.WARNING,
        levelColor: {
            [LogLevel.ERROR]: 'brown'
        }
    })
  ]
  ...
})
export class AppModule { }

```

## Usage

Once installation is done you can use it in any component or service by injecting `NgxFancyLoggerService`. 

```
export class AppComponent {
  title = 'demo';

  constructor(private logger: NgxFancyLoggerService) {
    logger.header('This is a Ngx Fancy Logger Demo', { color: 'red', fontSize: 30 });
    logger.debug('This is a DEBUG Log', { a: 20, b: 30 });
    logger.info('This is a INFO log', 123, { a: 20, b: 30 });
    logger.warning('This is a WARNING Log', { a: 20, b: 30 });
    logger.error('This is an ERROR Log', { a: 20, b: 30 });

    logger.header('Observable Log Message using debugOperator() ');
    const source$ = of(Math.random(), { test: 'data' }, 123, 'This  is source observable data');
    source$.pipe(
      logger.debugOperator('Source Response : ', LogLevel.INFO),
      map(data => ({ key: Math.random(), response: data}) ),
      logger.debugOperator('Mapped Response : ')
    ).subscribe();
  }
}

```

### Methods :
Name            | Description
----------------|-------------
debug           | Show the DEBUG logs, Priority in LogLevel = 0, `LogLevel.DEBUG`
info            | Show the INFO logs, Priority in LogLevel = 1, `LogLevel.INFO`
warning         | Show the WARNING logs, Priority in LogLevel = 2, `LogLevel.WARNING`
error           | Show the ERROR logs, Priority in LogLevel = 3, `LogLevel.ERROR`
updateConfig    | Override default configuration / configuration done with `forRoot()`
resetConfig     | Reset to default configuration 
debugOperator   | It is an RxJS custom operator to debug Observable Streams.

Each method supports any no. of parameters, the way you do in `console.log()`.


## Sample Usage Screenshots

### Header and Different Log Level Sample Logs

![Header and Different Log Level Sample Logs](https://raw.githubusercontent.com/ngdevelop-tech/ngx-fancy-logger/master/sample-images/logLevels_header.png "Header and Different Log Level Sample Logs")

### Debug RxJS Observable Stream using `debugOperator()` operator function 
![Debug RxJS Observable Stream using debugOperator() operator function ](https://raw.githubusercontent.com/ngdevelop-tech/ngx-fancy-logger/master/sample-images/debugOperator.png "Debug RxJS Observable Stream using debugOperator() operator function")

## Configuration

Configuration is of type `LoggerConfig`. as you can see in above example. You can do following configurations.

Config Type | Default                            | Description 
------------|------------------------------------|------------
showTime    | `true`                             | Show/hide time in logs. 
showEmoji   | `true`                             | Show/hide emoji in logs.
showLabel   | `true`                             | Show/hide log label (Usecase : can be removed when you want to only show emoji)
disableLogs | `false`                            | if it is `true`, all logs are disabled, (Usecase : can be used in production to disable logs)
logLevel    | `LogLevel.INFO`                    | `logLevel` will allow you to show only logs of that level and above.(Usecase : can be used for environment specific log levels)
levelColor | { <br> [LogLevel.INFO] : 'steelblue', <br>[LogLevel.DEBUG] : 'black',<br> [LogLevel.WARNING] : 'orange', <br>[LogLevel.ERROR]: 'red' <br>} | Override default log level color. here `color` string can be any standard color specified in [W3 Colors](https://www.w3.org/wiki/CSS/Properties/color/keywords). or hex code.
levelEmoji | { <br> [LogLevel.INFO] : '🐬', <br>[LogLevel.DEBUG] : '👨‍💻',<br> [LogLevel.WARNING] : '⚡', <br>[LogLevel.ERROR]: '😨' <br>} | Override default emoji. here `emoji` string can be any standard emoji specified in [unicode.org emoji list](https://unicode.org/emoji/charts/full-emoji-list.html).

# Dependencies

`@angular/core >= 6.0.0`, `@angular/common >= 6.0.0`, `rxjs >= 6.0.0`

## Demo 
[Ngx-Fancy-Logger Demo with All available configuration options](https://ngx-fancy-logger.netlify.app/#/demo)

## Contribute
All are welcome to contribute to `NgxFancyLogger`. Contribute with some code, file a bug or improve the documentation.

## Mark a Star ⭐
If you like this library, **mark a star** ⭐ on [ngx-fancy-logger GitHub](https://github.com/ngdevelop-tech/ngx-fancy-logger) repository, this will increase our confidence to add new features in this library.