# carlos-ferrao

### Prerequisites

Docker Desktop installed and Node 12 or higher

## Test plan and exploratory testing

Did everything work as expected?

- I didn't find critical bugs, but I think there are some things to improve.

What bugs were discovered?

- if you intall the app with a system language and after that you change it, the app does not update the language even kill the app and open again.

- I would like to know what is the reequirements for balances or events in the future, because I don't know if is really useful can put future expenses.

- In the calendar there is not today button, for me is a missing useful feature.

- Why does not the swipe carrier let you come back to past days?? is a requirement?

Prioritisation of those charters - which area of the app or testing would you explore first and why?

For me the critical charter are:

- Calculator
  - This is the most critical part because if the calculator does not round out or doesn't manage the numbers size properly es una castaña
- Currency exchange
  - After calculator, I think that the most value feature is currency exchange since it should be updated to the economic stock market movements of the country
- Data events management
  - After all operations with money, the events management is the next most important thing
- Languages and settings
  - This scope is important, but if the last think that I would test

How much time you have planned for each charter?

- Calculator
  1h
- Currency exchange
  30min
- Data events management
  30min
- Languages and settings
  15 min

What kind of risks you need to mitigate for this type of application?

- Exchange calculation and money calculation.

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

A list of test cases proposed for automation:

- You can see all test cases into the reports folder, you just need to open the .html file.

A short explanation of the provided solution.

- I've use Typescript because is an oriented and typed language with an easy way to build, configure and launch whatever thing you want to do.
- I use Jest as test runner because is a delightful Testing Framework with a focus on simplicity.

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

### Tech solution:

I've used appium and javascrip because is a useful, fast, and an easy way to develop android test without Android estudio environmnet since is an open source framework.
