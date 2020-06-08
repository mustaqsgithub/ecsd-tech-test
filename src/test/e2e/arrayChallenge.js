var assert = require("assert");
var webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
require("geckodriver");
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
const serverUri = "http://localhost:3000/#";
const appTitle = "React App";
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
var rowEle = By.xpath("//section[@id = 'challenge']//div/table/tbody/tr");
var colEle = By.xpath("//section[@id = 'challenge']//div/table/tbody/tr[1]/td");
var yourNameEle = By.xpath("//input[@data-test-id = 'submit-4']");
const submitAnswerButton = By.xpath("//span[contains(text(), 'Submit Answers')]");
const closePopUp = By.xpath("(//SPAN[text()='Close'])[1]");

var browser = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();
function logTitle() {
  return new Promise((resolve, reject) => {
      browser.getTitle().then(function(title) {
          console.log("Title: "+title);
          resolve(title);
      });
  });
}

function submitChallengeInput(inputKey, inputValue) {
       browser.findElement(By.xpath("//input[@data-test-id = 'submit-"+inputKey+"']")).sendKeys(inputValue).then(function() {
       console.log(inputValue);
   });
}

function submitYourName(inputValue) {
   browser.findElement(yourNameEle).sendKeys(inputValue).then(function() {
   console.log(inputValue);
});
}

function submitAnswers() {
   browser.findElement(submitAnswerButton).click().then(function() {
});
}

function closeBrowser() {
   browser.findElement(closePopUp).click().then(function() {
       browser.quit();
});
}

function findIndexOfRows(arr, size) {
   var right_sum = 0;
   var left_sum = 0;
   for (var i = 1; i < size; i++) {
       right_sum += parseInt(arr[i]);
   }
   for (var i = 0, j = 1; j < size; i++, j++) {
           right_sum -= parseInt(arr[j]);
           left_sum += parseInt(arr[i]);
           if (left_sum === right_sum)
               return i + 1;
               // return parseInt(arr[i+1]);
   }
   return -1;
}

async function submitChallenge() {
   var rows = await browser.findElements(rowEle);
   var columns =  await browser.findElements(colEle);
   var rowVal = [];
   var i = 1;
   for(var row of rows) {
       rowVal = await row.getText();
       console.log("Row: " +rowVal);
       var indexResult = findIndexOfRows(rowVal.split(' '), columns.length);
       console.log("Index Result: " + indexResult);
       submitChallengeInput(i++,indexResult);
       i >= rows.length
   }

}
// Launch Browser
browser.get(serverUri);

// Click at Render Challenge button
browser.findElement(By.xpath("//button[@data-test-id = 'render-challenge']")).click().then(function() {
   return new Promise((resolve, reject) => {
       console.log("I am at Table");
        browser
        .then(logTitle)
        .then(title => { assert.equal(title, appTitle); resolve(); })
        .then(submitChallenge) // AsyncRow will read table and get index and insert submit the answers
        .then(submitYourName("Mustaq Syed"))
        .then(submitAnswers)
        .catch(err => reject(err));

       });

});
