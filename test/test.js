const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const lighthouse = require('lighthouse');
const { exec } = require("child_process");
const assert = require('assert');
const fs = require('fs')
require('../NodeJS/src/mongoose/db/defaultDB')
chrome.setDefaultService(new chrome.ServiceBuilder("/home/labuser/.local/lib/python3.5/site-packages/chromedriver_binary/chromedriver").build());

let FUN_SCORE = 0, LH_SCORE = 0;
let chromeoptions = new chrome.Options();
chromeoptions.addArguments("start-maximized");
chromeoptions.options_["debuggerAddress"] = "127.0.0.1:5454";

async function sleep(n) {
    await new Promise(r => setTimeout(r, n));
}

async function lighthouse_home_test(driver, url){
    try{
        let options = {logLevel: 'silent', output: 'json', onlyCategories: ['performance', 'accessibility', 'best-practices', 'performance', 'pwa', 'seo'], port: 5454, formFactor: 'desktop',screenEmulation: {mobile: false,width: Number((await driver.findElement(By.css('body')).getCssValue('width')).replace("px","")),height: Number((await driver.findElement(By.css('body')).getCssValue('height')).replace("px","")),deviceScaleFactor: 1,disabled: false}};
        let runnerResult_desktop = await lighthouse(url, options);
        options = {logLevel: 'silent', output: 'json', onlyCategories: ['performance', 'accessibility', 'best-practices', 'performance', 'pwa', 'seo'], port: 5454 };
        let runnerResult_mobile = await lighthouse(url, options);
        for ( let i of ['performance','accessibility', 'pwa', 'seo', 'best-practices'] ) {
            LH_SCORE += Number(runnerResult_desktop.lhr.categories[i].score);
            LH_SCORE += Number(runnerResult_mobile.lhr.categories[i].score);
        }
    }catch(e){console.log(e);}
}

async function test_home1(driver) {
    try{
        await driver.get("http://localhost:8000");
        assert((await driver.findElement(By.css("body")).getText()).toLowerCase().includes("hi we are here to provide the safest and the most thrilling travel experiences within the pandemic"))
        await driver.findElement(By.id('contact')).click()
        await driver.wait(until.urlIs('http://localhost:8000/about'), 3000);
        assert((await driver.findElement(By.css("body")).getText()).toLowerCase().includes("start by compelting our travel checklist which ensures your safety within the pandemic"))
        FUN_SCORE += 1
    }catch(e){console.log(e);}
}

async function test_home2(driver) {
    try{
        await driver.get("http://localhost:8000");
        await driver.findElement(By.id('checklist')).click()
        await driver.findElement(By.id('box')).click()
        assert((await driver.findElement(By.css("body")).getText()).toLowerCase().includes("use n95 mask or double masking"))
        FUN_SCORE += 1
        let btn = await driver.findElement(By.xpath("//button[contains(text(),'Popular Destinations')]"))
        assert(!(await btn.isEnabled()))
        FUN_SCORE += 1
        let checkboxes = await driver.findElements(By.xpath("//input[@type='checkbox']"))
        let c = 0, total_c = 0;
        while(c < 5 && total_c < 30){
            total_c += 1
            c = 0;
            for(let i of checkboxes){
                if (!(await i.isSelected()))
                    await i.click();
                else
                    c += 1
            }
        }
        assert(await btn.isEnabled())
        await sleep(2000);       
        await btn.click()
        FUN_SCORE += 1
        await driver.wait(until.urlIs('http://localhost:8000/travelguide'), 3000);
        FUN_SCORE += 1
    }catch(e){console.log(e);}
}

async function test_travelguide(driver) {
    try{
        await driver.get("http://localhost:8000/travelguide");
        assert(!(await driver.findElement(By.css("body")).getText()).toLowerCase().includes("a land of cultural and religious heritage, tamil nadu is one of the beautiful places in india for tourists or pilgrims to visit"))
        await driver.findElement(By.xpath('//*[contains(text(),"TamilNadu")]')).click()
        await sleep(2000);
        assert((await driver.findElement(By.css("body")).getText()).toLowerCase().includes("a land of cultural and religious heritage, tamil nadu is one of the beautiful places in india for tourists or pilgrims to visit"))
        FUN_SCORE += 1
    }catch(e){console.log(e);}
}

async function test_covidguidelines(driver){
    try{
        await driver.get("http://localhost:8000/coronaguidelines");
        assert(!(await driver.findElement(By.css("body")).getText()).toLowerCase().includes("epass is now required for all visitors entering tamil nadu"));
        await driver.findElement(By.xpath('//*[contains(text(),"TamilNadu")]')).click();
        await sleep(2000);
        assert((await driver.findElement(By.css("body")).getText()).toLowerCase().includes("epass is now required for all visitors entering tamil nadu"));
        FUN_SCORE += 1;
    }catch(e){console.log(e);}
}

async function start_chrome_debug(){
    let chrome_debug = null, driver = null;
    try{
        if(process.argv.includes('--validate'))
            chrome_debug = await exec("./node_modules/.bin/chrome-debug --remote-debugging-port=5454 --start-maximized --headless", (error, stdout, stderr) => {});
        else
            chrome_debug = await exec("./node_modules/.bin/chrome-debug --remote-debugging-port=5454 --start-maximized", (error, stdout, stderr) => {});
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeoptions).build();
        await lighthouse_home_test(driver, 'http://localhost:8000')
        await test_home1(driver);
        await lighthouse_home_test(driver, 'http://localhost:8000/about')
        await test_home2(driver);
        await lighthouse_home_test(driver, 'http://localhost:8000/travelguide')
        await test_travelguide(driver)
        await lighthouse_home_test(driver, 'http://localhost:8000/coronaguidelines')
        await test_covidguidelines(driver);
    }catch(e){console.log(e);}
    finally{
        if(driver){
            driver.close();
        }   
        await exec("for i in `lsof -i :5454 | tail -n+2 | awk '{print $2}'`; do kill -9 $i; done;" + chrome_debug.pid, (error, stdout, stderr) => {});
        if(process.argv.includes('--validate'))
            console.log("{SCORE:" + Math.round(((FUN_SCORE*60)/7) + ((LH_SCORE*40)/40)) + "}" );
        else{
            console.log("No of functional testcases cleared - " + FUN_SCORE + "/7" );
            console.log("No of lighthouse testcases cleared - " + LH_SCORE + "/40" );
        }
        process.exit();
    }
}

start_chrome_debug();
