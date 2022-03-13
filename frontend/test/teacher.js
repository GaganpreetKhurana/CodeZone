require('chromedriver');
const webdriver = require("selenium-webdriver");
const {By} = require ("selenium-webdriver");
const ltCapabilities = require('../capabilities');

const subject = "Economics212438765"
const description = "HSN-312125432"
const batch = "CSE-4th years21534"
const user = "teacher@gmail.com";
const password = "teacher";

describe("CodeZone Testing",async function(){
    // selenium automation testing on cloud used --- lambdatest for this
    // const USERNAME = ltCapabilities.capabilities.user;
    // const KEY =ltCapabilities.capabilities.accessKey;
    // const GRID_HOST = "hub.lambdatest.com/wd/hub";
    // const gridUrl = "https://" + USERNAME + ":" + KEY  + "@" + GRID_HOST;
    // driver = new webdriver.Builder().usingServer(gridUrl).withCapabilities(ltCapabilities.capabilities).build();
    let driver = new webdriver.Builder().forBrowser('chrome').build();
    
    describe("Teacher Login Test",async function(){
        it("Login To CodeZone", async function(){
            await driver.get("http://localhost:3000/");
            driver.manage().setTimeouts( { implicit: 5000 } )
            await driver.findElement(By.id("login-button")).click();
            await driver.findElement(By.id("email")).sendKeys(user);
            await driver.findElement(By.id("password")).sendKeys(password);
            await driver.findElement(By.id("sign-in")).click();
            });
    })
    describe("Teacher Dashboard Test",async function(){
        it("Logout button option", async function(){
            driver.wait(webdriver.until.elementLocated(By.id("logout-button")),5000);
            await driver.findElement(By.id("logout-button"));
            });
        it("Profile Settings option", async function(){
            await driver.findElement(By.id("profile-settings"));
            });
        it("Create class option", async function(){
            await driver.findElement(By.id("create-class"));
            });
        it("Join class option", async function(){
            await driver.findElement(By.id("join-class"));
            });
        it("Classes List", async function(){
            await driver.findElement(By.id("class-list"));
            });
    })

    let text = '';
    describe("Create new classroom", async function(){
        it("Open create classroom form",async function(){
            await driver.findElement(By.id("create-class")).click();
        })
        it("Enter Required Details",async function(){
            await driver.findElement(By.id("subject")).sendKeys(subject);
            await driver.findElement(By.id("batch")).sendKeys(batch);
            await driver.findElement(By.id("description")).sendKeys(description);
        })
        it("Submit Details",async function(){
            await driver.findElement(By.id("create-classroom")).click();
        })
        
        it("Response Message Displayed", async function(){
            driver.wait(webdriver.until.elementLocated(By.id("message")),5000);
            text = await driver.findElement(By.id("message")).getText();
            });
        it("Close Create Classroom Form", async function(){
            await driver.findElement(By.id("cancel")).click();
            });
    })
    describe("Join new classroom", async function(){
        it("Open join classroom form",async function(){
            await driver.findElement(By.id("join-class")).click();
        })
        it("Enter required details",async function(){
            await driver.findElement(By.id("code")).sendKeys(text.slice(-7));
        })
        it("Submitdetails",async function(){
            await driver.findElement(By.id("join-classroom")).click();
        })
        
        it("Response Message Displayed", async function(){
            driver.wait(webdriver.until.elementLocated(By.id("message")),5000);
            await driver.findElement(By.id("message")).getText();
            });
        it("Close Join Classroom Form", async function(){
            await driver.findElement(By.id("cancel")).click();
            });
    })
    describe("Classroom",async function(){
        it("Enter any Classroom", async function(){
            if(driver.findElement(By.id("class-card"))){
                await driver.findElement(By.id("class-card")).click();
            }else{
                console.log("No Classroom Find to enter");
            }
            });
    })
    describe("Notice-Board",async function(){
        it("Notice Board Check", async function(){
            await driver.findElement(By.id("notice-board"));
            });
    })
    describe("Quiz-Board",async function(){
        it("Quiz Board Check", async function(){
            await driver.findElement(By.id("quiz-board"));
            });
    })
    describe("Student-list",async function(){
        it("Student List Check", async function(){
            await driver.findElement(By.id("student-list"));
            });
    })
    describe("Profile-page",async function(){
        it("Profile Page Check", async function(){
            await driver.findElement(By.id("profile-page")).click();
            });
        it("Profile Details Displayed", async function(){
            await driver.findElement(By.id("name1"));
            await driver.findElement(By.id("email"));
            });
        it("Edit Profile Button Present", async function(){
            await driver.findElement(By.id("edit-profile"));
            });
    })
    describe("Edit Profile",async function(){
        it("Edit Profile Check", async function(){
            await driver.findElement(By.id("edit-profile")).click();
            });
        it("Edit Options Displayed", async function(){
            await driver.findElement(By.id("name"));
            await driver.findElement(By.id("avatar"));
            await driver.findElement(By.id("newPassword"));
            await driver.findElement(By.id("oldPassword"));
            await driver.findElement(By.id("confirmPassword"));
            await driver.findElement(By.id("go-back"));
            await driver.findElement(By.id("save"));
            });
        it("Go Back", async function(){
            driver.navigate().back();
            driver.navigate().back();
            });
    })



})
