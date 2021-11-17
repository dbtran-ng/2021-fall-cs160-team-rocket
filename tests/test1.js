// Include the chrome driver
require("chromedriver");

// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Get the credentials from the JSON file
let credentials = { email: "masaki.kudo@sjsu.edu", pass: "test123" };

// Step 1 - Opening the SpartanMeetup sign in page
let openSignin = tab.get("http://localhost:3000/login");
openSignin
  .then(function () {
    // Timeout to wait if connection is slow
    let findTimeOutP = tab.manage().setTimeouts({
      implicit: 10000, // 10 seconds
    });
    return findTimeOutP;
  })
  .then(function () {
    // Step 2 - Finding the username input
    let usernameField = tab.findElement(swd.By.name("email"));
    return usernameField;
  })
  .then(function (usernameBox) {
    // Step 3 - Entering the username
    let fillUsername = usernameBox.sendKeys(credentials.email);
    return fillUsername;
  })
  .then(function () {
    console.log(
      "Username entered successfully in" +
        "'login demonstration' for SpartanMeetup"
    );

    // Step 4 - Finding the password input
    let passwordField = tab.findElement(swd.By.name("password"));
    return passwordField;
  })
  .then(function (passwordBox) {
    // Step 5 - Entering the password
    let fillPassword = passwordBox.sendKeys(credentials.pass);
    return fillPassword;
  })
  .then(function () {
    console.log("Email/Password entered successfully");

    // Step 6 - Finding the Sign In button
    let signInBtn = tab.findElement(swd.By.name("login"));
    return signInBtn;
  })
  .then(function (signInBtn) {
    // Step 7 - Clicking the Sign In button
    let clickSignIn = signInBtn.click();
    return clickSignIn;
  })
  .then(function () {
    console.log("Successfully signed in!");
  })
  .catch(function (err) {
    console.log("Error ", err, " occurred!");
  });