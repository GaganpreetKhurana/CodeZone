require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const ltCapabilities = require("../capabilities");

const user = "gagan@gmail.com";
const password = "gagan";
const text = "sLLBFRX";

describe("CodeZone Testing", async function () {
  // selenium automation testing on cloud used --- lambdatest for this
  // const USERNAME = ltCapabilities.capabilities.user;
  // const KEY =ltCapabilities.capabilities.accessKey;
  // const GRID_HOST = "hub.lambdatest.com/wd/hub";
  // const gridUrl = "https://" + USERNAME + ":" + KEY  + "@" + GRID_HOST;
  // driver = new webdriver.Builder().usingServer(gridUrl).withCapabilities(ltCapabilities.capabilities).build();
  let driver = new webdriver.Builder().forBrowser("chrome").build();
  driver.manage().window().maximize();

  describe("Student Login Test", async function () {
    it("Login To CodeZone", async function () {
      await driver.get("http://localhost:3000/");
      driver.manage().setTimeouts({ implicit: 5000 });
      await driver.findElement(By.id("login-button")).click();
      await driver.findElement(By.id("email")).sendKeys(user);
      await driver.findElement(By.id("password")).sendKeys(password);
      await driver.findElement(By.id("sign-in")).click();
    });
  });
  describe("Student Dashboard Test", async function () {
    it("Logout button option", async function () {
      driver.wait(webdriver.until.elementLocated(By.id("logout-button")), 5000);
      await driver.findElement(By.id("logout-button"));
    });
    it("Profile Settings option", async function () {
      await driver.findElement(By.id("profile-settings"));
    });
    it("Join class option", async function () {
      await driver.findElement(By.id("join-class"));
    });
    it("Classes List", async function () {
      await driver.findElement(By.id("class-list"));
    });
  });

  describe("Join new classroom", async function () {
    it("Open join classroom form", async function () {
      await driver.findElement(By.id("join-class")).click();
    });
    it("Enter required details", async function () {
      await driver.findElement(By.id("code")).sendKeys(text);
    });
    it("Submitdetails", async function () {
      await driver.findElement(By.id("join-classroom")).click();
    });

    it("Response Message Displayed", async function () {
      driver.wait(webdriver.until.elementLocated(By.id("message")), 5000);
      await driver.findElement(By.id("message")).getText();
    });
    it("Close Join Classroom Form", async function () {
      await driver.findElement(By.id("cancel")).click();
    });
  });
  describe("Classroom", async function () {
    it("Enter any Classroom", async function () {
      if (driver.findElement(By.id("class-card"))) {
        await driver.findElement(By.id("class-card")).click();
      } else {
        console.log("No Classroom Find to enter");
      }
    });
  });
  describe("Notice-Board", async function () {
    it("Notice Board Check", async function () {
      await driver.findElement(By.id("notice-board"));
    });
  });
  describe("Quiz-Board", async function () {
    it("Quiz Board Check", async function () {
      await driver.findElement(By.id("quiz-board"));
    });
  });
  describe("Student-list", async function () {
    it("Student List Check", async function () {
      await driver.findElement(By.id("student-list"));
    });
  });
  describe("Profile-page", async function () {
    it("Profile Page Check", async function () {
      await driver.findElement(By.id("profile-page")).click();
    });
    it("Profile Details Displayed", async function () {
      await driver.findElement(By.id("name1"));
      await driver.findElement(By.id("email"));
    });
    it("Edit Profile Button Present", async function () {
      await driver.executeScript(
        "document.getElementById('edit-profile').scrollIntoView();",
        ""
      );
      await driver.findElement(By.id("edit-profile"));
    });
  });
  describe("User Details", async function () {
    it("User Details Displayed", async function () {
      await driver.findElement(By.id("name1"));
      await driver.findElement(By.id("sid1"));
      await driver.findElement(By.id("email"));
    });
    it("Go Back", async function () {
      driver.navigate().back();
      driver.navigate().back();
    });
  });
});
