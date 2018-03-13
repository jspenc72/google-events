<h1><img src="https://raw.githubusercontent.com/jspenc72/google-events/master/.github/ge.png"/>
</h1>


NodeJS Framework to obtain events from the google search api.




```js
googleEvents.scrape("events next week salt lake city utah")
.then((res) => {
  console.log("it scrapes!", res)
  res.events.forEach((event, index) => {




    // {   day: '16',
    //    image: "url to image",
    //    location: 'Rose Wagner Performing Arts Center · Salt Lake City, UT',
    //    month: 'MAR',
    //    text: '16\nMAR\nDabke\nSalt Lake County Center For The Arts\nFri, Mar 16 – Sun, Mar 18\nRose Wagner Performing Arts Center · Salt Lake City, UT\n\n',
    //    time: 'Fri, Mar 16 – Sun, Mar 18',
    //    title: 'Dabke' }
  })

})
.catch(err => {
  console.error(err);
})

```
