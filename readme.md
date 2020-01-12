# JS Search repo

This repo represents my solution for an search bar based on some formated results.

First the users enter what they want to search in the search input. There is a delay of 0.4 seconds `let doneTypingInterval = 400;  //time in ms` until javascript comes in place. 

After those 0.4 seconds a function named **doneTyping** is called to check if user has entered more than two characters in order to create an async search to our data. 

If more than two characters entered, a function named **searchOptions** is called with a parameter which is the value of the user search `searchOptions(search.value)`.

After **searchOptions** is called my code is taking as a parameter the browser language and because many languages are outlined with a two to four label (ex. en-US), the code takes only the first two characters as input. `let userLang = navigator.language; let langRes = userLang.substring(0, 2);`

Another parameter is the width of the screen so we can narrow down the results count. If the screen width indicates us a mobile phone, the results are equal to 10. If tablet or another devices is indicated the results are 20.
`   let limitRes = 10;
    let screenWidth = screen.width;
    if (screenWidth > 768) {
        limitRes = 20;
    }`
    
Now, a query to our service is created with 3 parameters. Our user's search value, browser language and results count.
`let link = http://35.180.182.8/search?keywords=${search.value}&language=${langRes}&limit=${limitRes};`


A regular expression is created to match user's search value with data given. Our data return as an array.

`    // Get matches to current text input
    let matches = resList.entries.filter(resMatch => {
        const regex = new RegExp(${searchText}, 'gi');
        return resMatch.name.match(regex);
    });`
    
A function named outputHtml is called so we can pass our array to html elements. We create an arrow function to map our array as new elements on a selected element. (In this case an **ul** with an id="matchList")
   
   `
   const outputHtml = matches => {
    if (matches.length > 0) {

        const html = matches.map(match => 
        <li onclick="changeSearchText('${match.name}')" class="mb-2 mt-2">
            ${match.name}
        </li>
        ).join('');

        matchList.innerHTML = html;



    }
};`

Also on new <li> items there is an onClick attribute so when user clicks on a result it's value is passed to the search area. If user clicks the **Click to Search** button a google search with the value of the result is given.
