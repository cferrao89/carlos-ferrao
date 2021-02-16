# carlos-ferrao

### Prerequisites

Docker Desktop installed and Node 12 or higher

## Test plan and exploratory testing

I didn't figure out BUGS, but you can see al the testing levels and test plan in - Carlos - Test plan Monely.pdf -

## API testing project

You should do the following steps:

```
> docker pull swaggerapi/petstore3:unstable
> docker run  --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:unstable
```

On Terminal into project path:

```
> cd api
> npm i
> npm run test:int
```

The reports are located on reports folder into api project.

## Mobile testing project

You should do the following steps:

```
> npm i -g appium
```

You need to have de Android Studio and generate a Android 10 emulator, then run it and check that is avilable with command:

```
> adb devices
```

The command should return device conected:

```
List of devices attached
emulator-5554   device
```

The next step is open a new terminal and run the command:

```
appium -p 4723
```

After that On other Terminal into project path:

```
cd mobile
npm i
npm run test:app
```

The reports are located on reports folder into api project.
