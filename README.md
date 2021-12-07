# 2021-fall-cs160-team-rocket
## Short Description
    SpartansMeetup is the web application designing specifically for SJSU community.
    At SpartansMeetup, they can create or participate in events/groups. 
#### Current Features
- Authentication
- Register/ Sign In to your Credentials
- Create/ Modify your Profile Information
- Update your Profile Picture
- Create/ Modify your Groups
- Create/ Modify your Events
- Log user out on token expiration
#### Future Features
- Verification Code to Email to verify REAL users
- Search capabilities
- Automatically Send Emails about Event information / Group Rules to Participated Users
- Direct Inbox to Hosts
- Management features for Host such as put restrictions for Group/ Event members

## Demo
![main](https://user-images.githubusercontent.com/70964027/144965663-1ae73be1-e174-47b0-96ec-8ea3ae5ea175.png)
![signup](https://user-images.githubusercontent.com/70964027/144965602-c0d64d95-3d5b-48e0-94d2-b0fb978a14ff.png)
![signin](https://user-images.githubusercontent.com/70964027/144965658-4aa2fa45-8646-4130-87d6-b5c64c48da53.png)
![dashboard](https://user-images.githubusercontent.com/70964027/144965674-24bc1337-9230-4b66-b20f-ec778f52dcba.png)
![members](https://user-images.githubusercontent.com/70964027/144965677-db34b553-a6c6-43b2-8bba-70b316b2bce2.png)
![groups](https://user-images.githubusercontent.com/70964027/144965678-7275dde7-6dd5-4ea0-b6f1-1204b35c0ad6.png)
![post](https://user-images.githubusercontent.com/70964027/144965681-bd69c178-88fb-4613-aec1-8201a25d4b20.png)

## Prerequisites

Tools: VSCode, Terminal, Redux Extension on Chrome Browser

Technology: NodeJS, ExpressJS, React, MongoDB

Language: Javascript, HTML, CSS

## Set up Development Environment

a. Development Environment - Using MERN stack (MongoDB, ExpressJS, React/Redux, NodeJS)
Install Node.JS, Visual Studio Code, and we use Github as a tool to push our Code

b. Either you clone the code or you decide to manually copy the code, we will provide the setup steps for our Website:

- You can implement our code to your current setup by: git clone https://github.com/dbtran-ng/2021-fall-cs160-team-rocket.git or use GitHub Desktop to clone 

OR

1. Choose the folder for the project, and open the Terminal on VSCode.
2. npm init - setup basic package.json 
3. npm i express express-validator bcryptjs config jsonwebtoken mongoose request
4. npm i -D nodemon concurrently
5. Set up Front-end - client folder: npx create-react-app client
6. cd client => npm i axios react-router-dom redux react-redux react-bootstrap redux-thunk redux-devtools-extension
7. npm i uuid => import {v4 as uuid} from 'uuid' and use by calling uuid()
8. To fix any npm scripts, go to the package.json file in the root folder. Please checkout our package.json file to see how we fix to get back-end and front-end running concurrently
9. To see libraries we are using to develop this website, go to /client/package. json


c.  For MongoDB database:
1. Set up MongoDB: https://www.mongodb.com to create a new account or you can use the default MongoDB to get started to use the website - however, you cannot modify the database when you will not have access to our MongoDB account.
2. Create a new  project and set up new Cluster Configuration - here we use AWS cloud and N-Virginia as the region. They provide a free tier plan with a maximum to 100 connections.
3. Go to security and set up SCRAM authentication. And set a new Whitelist Entry as you wish - here I chose to set as “allow access anywhere”
4. After the Cluster finishing the setup phase, go to Connect => Connect Your Application => Copy the provided String to the Project  => In the config folder -> default.json -> mongoURI 

We use Branching on Github to check out code from other members and easily merge new codes to master branch


## Test Automation by Selenium
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

## User Guides

1. Get started to use our Spartan Meetup by registering a new account ending with @sjsu.edu - we will add verification code sending to SJSU email. Therefore, only SJSU students, who have access to SJSU email, are able to use this Website.
2. Redirect to Sign In page => use your new credentials to sign in 
3. Redirect to Dashboard page 
    - If you don’t have your profile, feel free to create your own profile, update your preferred profile picture.
    - If you have your profile, you can use our features such as join group or event, comment, and see updates from your groups.

On our Navigation Bar

4. Dashboard - where you can manage your profile/ your own groups / your own events. In your profile page, it will display some basic information that you provided as well as  your current participation in which events/groups. You can also update your profile information by clicking on Edit Profile Button or update your profile picture by clicking on Update Profile Picture.
5. Members - see current members active in our Website. You can see each member information by clicking on their profile box
6. Events - see current events happening right now. You can view Event Details. 
In Event Details, you can join/leave events, add your comments and view Event member/Event information.
7. Group - see current groups happening right now. You can view Group Details.
In Groups Details, you can join/leave the group, add posts, view Group members.
8. Log out to secure your account

## Quick Start
### Update default.json file in config folder with your MongoDB identification
    {
    "mongoURI":"<your_mongoDB_Atlas_uri_with_credentials>",
    "jwtSecret": "secret"
    }
### Install server dependencies
    npm install
### Install client dependencies
    cd client
    npm install
### Run both Express & React from Terminal
    npm run dev
