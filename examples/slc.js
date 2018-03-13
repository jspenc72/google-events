const  googleEvents = require('../index')({});
const fs = require("fs")
const Nightmare = require('nightmare')
// googleEvents.search("events tomorrow salt lake city")
// .then((res) => {
//   console.log(res)
//
//   fs.writeFile("./examples/test.html", res, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//       console.log("The file was saved!");
//   });
// })
// .catch(err => {
//   console.error(err);
// })


googleEvents.scrape("events next week salt lake city utah")
.then((res) => {
  console.log("it scrapes!", res)
  // var str = ""
  // res.events.forEach((itm, idx) => {
  //   str = str + itm.html
  // })
  //
  // fs.writeFile("./examples/test.html", str, function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //     console.log("The file was saved!");
  // });

})
.catch(err => {
  console.error(err);
})
