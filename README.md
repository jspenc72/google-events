<h1><img src="https://raw.githubusercontent.com/jspenc72/google-events/blob/master/.github/ge.jpg"/>
</h1>


NodeJS Framework to obtain events from the google search api.




```js
googleEvents.scrape("events next week salt lake city utah")
.then((res) => {
  // res looks like;
  // { count: 13,
  //   events: [Array],
  //   query: 'events next week salt lake city utah',
  //   selector: 'g-inner-card > div > div > a' }

  res.events.forEach((event, index) => {
    // event looks like this:
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
