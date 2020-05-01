# ngx-fancy-logger

ngx-fancy-logger is a console logger for angular applications. It provides various features like different log levels, display labels, show time etc. 

# [Read Detailed Documentation](./projects/ngx-fancy-logger/README.md)

## Key Features

- Different Log Levels (INFO=0, DEBUG=1, WARNING=2, ERROR=3).
- Log Levels are displayed in Label form with assigned color style or default colors.
- Show/Hide Time
- Show/Hide Emoji for each Log Level
- Show Header on console (`color` and `fontSize` configurable)
- Debug RxJS Observable Stream using `debugOperator()` operator function  
- Can configure each setting with `LoggerConfig` in `forRoot` (which allows us to configure `environment` specific configuration) or using `updateConfig()` method.
- Reset configuration using `resetConfig()` method
- Environment Specific Log Level Restriction.
    eg. if you set `logLevel` to `WARNING`, it will only show logs for `WARNING` and `ERROR`. 
- Can configure Log Level Colors.
- Can Disable all logs

## Sample Usage Screenshots

### Header and Different Log Level Sample Logs

![Header and Different Log Levels Sample Logs](./sample-images/logLevels_header.png "Header and Different Log Levels Sample Logs")

### Debug RxJS Observable Stream using `debugOperator()` operator function 
![Debug RxJS Observable Stream using debugOperator() operator function ](./sample-images/debugOperator.png "Debug RxJS Observable Stream using debugOperator() operator function")


## Demo 
This repository includes `demo` project. clone the repository and execute `npm run start` to start demo app.

## Contribute
All are welcome to contribute to `NgxFancyLogger`. Contribute with some code, file a bug or improve the documentation.

## Mark a Star ⭐
If you feel this library useful, **mark a star** which increases the confidence to add new features in this library.