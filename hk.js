const puppeteer = require("puppeteer");

const codeObj = require('./codes');

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'xyzfarheen@gmail.com';
const password = 'Xyz@farheen';

//puppeteer ko initialise krna hai - using - puppeteer.launch
// browser open krta hai



//IIFE - Immediately Invoked Function expression
(async function(){
    try{
        let browserOpen = await puppeteer.launch({
            headless:false,
            args:['--start-maximized'],
            defaultViewport:null
        })
        let newTab = await browserOpen.newPage()
        await newTab.goto(loginLink)
        await newTab.type("input[id='input-1']", email, {delay: 10})
        await newTab.type("input[type='password']", password, {delay: 10})
        await newTab.click('button[data-analytics="LoginPassword"]', {delay:10})
        await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab)
        await waitAndClick('input[value="warmup"]', newTab)
        let allChallenges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
        console.log('total questions: ', allChallenges.length);



    }catch (err){
        console.log(err);

    }
})()

async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector)

    let selectorClicked = cPage.click(selector)
    return selectorClicked

}