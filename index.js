const Nightmare = require('nightmare'), async = require('async');
const nightmare = Nightmare({ show: true });
var cheerio = require('cheerio')
const moment = require('moment');
const Rx = require('rxjs/Rx');
const rp = require('request-promise');
const _ = require('lodash');

function sendSearchRequest(query){
  var options = {
      method: 'GET',
      uri: `https://www.google.com/search?q=${query}&oq=spring&aqs=chrome.1.69i57j35i39l2j0.1696j0j9&client=ms-android-google&sourceid=chrome-mobile&ie=UTF-8#fpstate=tlexp&htiq=events%20this%20week%20utah`,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36'
      },
      json: true // Automatically parses the JSON string in the response
  };

  return rp(options);
}

function setOptions(opts) {

}

function scrape(query) {
  var options = {
      method: 'GET',
      uri: `https://www.google.com/search?q=${query}&oq=spring&aqs=chrome.1.69i57j35i39l2j0.1696j0j9&client=ms-android-google&sourceid=chrome-mobile&ie=UTF-8#fpstate=tlexp&htiq=${query}`,
      useragent: 'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36',
      json: true
  };

  return nightmare
  .useragent(options.useragent)
  .goto(options.uri)
  .wait("g-inner-card")
  .wait(5000)
  .then(() => {
    console.log("now scrolling")
    return new Promise(function(resolve, reject) {
      var previousHeight, currentHeight = 0;
      function scrollDown() {
        previousHeight = currentHeight;
        nightmare.evaluate((selector, done) => {
            var response = {}
            response.height = document.querySelector(selector).scrollHeight
            setTimeout(() => {
              done(null, response);
            }, 500);
        }, "body")
        .then((res) => {
          console.log("currentHeight", res)
          currentHeight = res.height;
          return nightmare
          .scrollTo(res.height, 0)
          .wait(5 00);
        })
        .then(() => {
          if (previousHeight !== currentHeight) {
            // previousHeight = currentHeight;
            console.log("Scrolling Down")
            scrollDown()
          }else{
            console.log("Reached the Bottom");
            resolve()
          }
        })
        .catch(err => {
          reject(err)
        })
      }
      scrollDown();
    });
  })
  .then(() => {
    return nightmare
    .evaluate((selector, done) => {
      var nodelist = document.querySelectorAll(selector);
      var linklist = document.querySelectorAll("g-inner-card > div > div > a")
      var response = { events: [], count: nodelist.length, selector: selector }
      for (i = 0; i < nodelist.length; i++) {
        var target = {}
        var node = nodelist[i]
        var linkNode = linklist[i]
        target.text = node.innerText
        target.html = node.innerHTML
        target.link = node ? linkNode.getAttribute("href") : "";
        target.day = node ? node.querySelector("div > div:nth-child(1) > div:nth-child(1)").innerText : "";
        target.month = node ? node.querySelector("div > div:nth-child(1) > div:nth-child(2)").innerText : "";
        target.title = node ? node.querySelector("div > div:nth-child(2) > div:nth-child(1)").innerText : "";
        target.time = node ? node.querySelector("div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)").innerText : "";
        target.location = node ? node.querySelector("div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)").innerText : "";
        var imageNode = node.querySelector("img");
        target.image = imageNode ? imageNode.getAttribute("src") : "";
        response.events.push(target)
      }
      setTimeout(() => {
        done(null, response);
      }, 1000);
    }, "g-inner-card > div > div > a")
  })
}


module.exports = function(opts) {

  setOptions(opts)

  return {
    search: function(q) {
      return sendSearchRequest(q);
    },
    scrape: function(query) {
      return scrape(query)
    },
    nightmare: function() {
      return nightmare
    }
  };
}
