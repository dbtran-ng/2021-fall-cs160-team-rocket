// Include the chrome driver
require("chromedriver");

// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Get the information from the JSON file
// This information should be new everytime we run the test
let information = {
  name: "Kimberly",
  email: "kim.tien@sjsu.edu",
  pass: "kim123",
  confirmPass: "kim123",
};

// Step 1 - Opening the SpartanMeetup sign up page
let openSignUp = tab.get("http://localhost:3000/register");
openSignUp
  .then(function () {
    // Timeout to wait if connection is slow
    let findTimeOutP = tab.manage().setTimeouts({
      implicit: 10000, // 10 seconds
    });
    return findTimeOutP;
  })
  .then(function () {
    // Step 2 - Finding the username input
    let usernameField = tab.findElement(swd.By.name("name"));
    return usernameField;
  })
  .then(function (usernameBox) {
    // Step 3 - Entering the username
    let fillUsername = usernameBox.sendKeys(information.name);
    return fillUsername;
  })
  .then(function () {
    let emailField = tab.findElement(swd.By.name("email"));
    return emailField;
  })
  .then(function (emailBox) {
    // Step 3 - Entering the username
    let fillEmail = emailBox.sendKeys(information.email);
    return fillEmail;
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
    let fillPassword = passwordBox.sendKeys(information.pass);
    return fillPassword;
  })
  .then(function () {
    let repasswordField = tab.findElement(swd.By.name("repassword"));
    return repasswordField;
  })
  .then(function (repasswordBox) {
    // Step 5 - Entering the password
    let refillPassword = repasswordBox.sendKeys(information.confirmPass);
    return refillPassword;
  })

  .then(function () {
    console.log("Email/Password/ConfirmPass entered successfully");

    // Step 6 - Finding the Sign In button
    let signUpBtn = tab.findElement(swd.By.name("signup"));
    return signUpBtn;
  })
  .then(function (signUpBtn) {
    // Step 7 - Clicking the Sign In button
    let clickSignUp = signUpBtn.click();
    return clickSignUp;
  })
  .then(function () {
    console.log("Successfully signed up!");
  })
  .catch(function (err) {
    console.log("Error ", err, " occurred!");
  });
