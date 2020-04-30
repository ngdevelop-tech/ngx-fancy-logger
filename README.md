# ngx-fancy-logger

**ngx-fancy-logger** is a console logger for angular applications. It provides various features like log levels, labels, time etc. 

## Features

- Log Levels (INFO=0, DEBUG=1, WARNING=2, ERROR=3 ).
- Log Levels are displyed in Label form with assigned color style.
- Show/Hide Time
- Can configure each setting with `LoggerConfig` in `forRoot` (which allows us to configure `environment` specific configuration).
- Can configure Log Level in config. that will only show log of that level and above.
    eg. if you set logLevel to `WARNING`, it will only show logs for `WARNING` and `ERROR`. 
- Can configure Log Level Colors. 
- All default console features.

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
    logger.info('This is a INFO log', 123, { a: 20, b: 30 });
    logger.debug('This is a DEBUG Log', { a: 20, b: 30 });
    logger.warning('This is a WARNING Log', { a: 20, b: 30 });
    logger.error('This is an ERROR Log', { a: 20, b: 30 });
  }
}

```

### Methods :
Name            | Description
----------------|-------------
info            | show the INFO logs, Priority in LogLevel = 0, `LogLevel.INFO`
debug           | show the DEBUG logs, Priority in LogLevel = 1, `LogLevel.DEBUG`
warning         | show the WARNING logs, Priority in LogLevel = 2, `LogLevel.WARNING`
error           | show the ERROR logs, Priority in LogLevel = 3, `LogLevel.ERROR`

Each method supports any no. of parameters, the way you do in `console.log()`. 

## Configuration

Configuration is of type `LoggerConfig`. as you can see in above example. You can do following configurations.

Config Type | Default                          | Description 
------------|----------------------------------|------------
showTime    | true                             | You can show and hide time in logs. 
logLevel    | LogLevel.INFO                    | `logLevel` will allow you to show only logs of that level and above.
levelColor | { <br> [LogLevel.INFO] : 'steelblue', <br>[LogLevel.DEBUG] : 'black',<br> [LogLevel.WARNING] : 'orange', <br>[LogLevel.ERROR]: 'red' <br>} | You can set LogLevel to INFO, DEBUG, WARNING and ERROR. You can override default levelColor.here `color` string can be any standard color specified in [W3 Colors](https://www.w3.org/wiki/CSS/Properties/color/keywords). or hex code.

## Demo 
This repository includes `demo` project. clone the repository and execute `npm run start` to start demo app.

## Contribute
All are welcome to contribute to `NgxFancyLogger`. Contribute with some code, file a bug or improve the documentation.

## Mark a Star ⭐
If you feel this library useful, **mark a star** which increases the confidence to add new features in this library.