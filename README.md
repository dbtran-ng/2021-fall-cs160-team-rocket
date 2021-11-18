# 2021-fall-cs160-team-rocket

# Creating Test Automation by Selenium

1. Prerequisites
- Node.js
- Selenium can be installed via npm with “npm install selenium-webdriver”
- Go to https://www.npmjs.com/ to search for selenium-webdriver to get additional components to work with each of the major browsers
- Google Chrome
- WebDriver for Google Chrome should be placed on your system PATH
- IDE (VS code)

2. Steps to test for Login Automation
- Change working directory to tests/
- In terminal of the working directory, run “node test1.js”

3. Steps to test for Sign up Automation
- Change working directory to tests/
- In terminal of the working directory, run “node registerTest.js”
- To test for - Sign up fail - user existed, run “node registerTest.js”
- To test for the new user, in the tests/registerTest.js, the information should be changed in order to create new user
