# CaronSale backend task

This is a backend task for the CarOnSale company, to know more information about the task please [click here](https://github.com/car-on-sale/cos-coding-challenge/tree/master/challenges/backend)

# Tests

To run the tests please run the command

```
npm run test
```

# Running application

To run this application you should first

```
cp .env.example .env
npm run start
```

Is possible provide some variables to run for another clients, to do this

```
cp .env.example .env
USEREMAIL="test@gmail.com" USERPASSWORD="passwordTes" npm run start
```

In the example above the user test@gmail will be used to execute the script.

# Printer

For each execution, the log is being stored in the history/DateIso when the script was executed, the idea doing this is provide a way to save script execution.

Welcome to the CarOnSale backend coding challenge.

# Package installed

To run this project some packages was installed, like sinon and nock for tests.
The current project was using tslint, and this package is outdated, so the project was migrated to eslint.
