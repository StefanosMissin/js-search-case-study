# JS Search repo

This repo represents my solution for an search bar based on some formated results.

First the users enter what they want to search in the search input. There is a delay of 0.4 seconds `let doneTypingInterval = 400;  //time in ms` until javascript comes in place. 

After those 0.4 seconds a function named **doneTyping** is called to check if user has entered more than two characters in order to create an async search to our data. 

If more than two characters entered, a function named **searchOptions** is called with a parameter which is the value of the user search `searchOptions(search.value)`.

After **searchOptions** is called my code is taking as a parameter the browser language and because many languages are outlined with a two to four label (ex. en-US), the code takes only the first two characters as input. `let userLang = navigator.language; let langRes = userLang.substring(0, 2);`