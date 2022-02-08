require('chromedriver');
const webdriver = require("selenium-webdriver");
const {By} = require ("selenium-webdriver");
const ltCapabilities = require('../capabilities');

describe("Open CodeZone",function(){
    // selenium automation testing on cloud used --- lambdatest for this
    const USERNAME = ltCapabilities.capabilities.user;
    const KEY =ltCapabilities.capabilities.accessKey;
    const GRID_HOST = "hub.lambdatest.com/wd/hub";
    const gridUrl = "https://" + USERNAME + ":" + KEY  + "@" + GRID_HOST;

    //mocha function BEFOREEACH to get the webdriver it specifies part of code prior to each it block
    // driver needs to be loaded before all it blocks
    beforeEach(function(){
    driver = new webdriver.Builder().usingServer(gridUrl).withCapabilities(ltCapabilities.capabilities).build();
    });

    afterEach(async function(){
        await driver.quit();
        });

    it("Login To CodeZone", async function(){

    // await driver.get("http://localhost:3000/");
    await driver.get("http://localhost:3000/");
    // await driver.findElement(By.id("login-button")).click();

    });
})
// async function example(){
    

//     // await driver.quit();

// }
// // example();