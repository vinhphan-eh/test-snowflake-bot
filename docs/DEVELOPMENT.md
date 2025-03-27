# Development Guideline

## Prerequisite

### dotEnv configuration

1. copy `example/.env.example` to `example/.env`

### Installation
1/ Install dependencies
```shell
yarn install
```
2/ Install example dependencies
```shell
yarn install:bundle - Bundle gem if it's your first time else no need

yarn install:all
```
3/ Start metro
```shell
yarn start
```
4/ Run ios app
```shell
yarn ios
```

Recommend running it on xcode for better logging by 
```shell
xed ios
```

### Refresh after upgrading react, pod, etc

If you get strange errors running `yarn ios`, try the following:

```shell
yarn clean:all:ios
yarn install:all
yarn start --resetCache
yarn ios
```
