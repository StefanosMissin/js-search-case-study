const search = document.getElementById('search');
const matchList = document.getElementById('matchList');
const matchListDiv = document.getElementById('matchListDiv');

//setup before functions
let typingTimer;                //timer identifier
let doneTypingInterval = 400;  //time in ms
let myInput = document.getElementById('search');

//on keyup, start the countdown
myInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (myInput.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
    else if (myInput.value == "") {
        matchList.innerHTML = '';
    }
});

// When user finishes time Function doneTyping is called
function doneTyping() {
    if (myInput.value.length > 1) {
        //call Search Function
        searchOptions(search.value);
    }
    else if (myInput.value.length == 1) {
        matchList.innerHTML = '';
    }

}


// Search Results from Service asked

const searchOptions = async searchText => {

    // get browser language
    let userLang = navigator.language;
    let langRes = userLang.substring(0, 2);
    let limitRes = 10;

    let screenWidth = screen.width;
    if (screenWidth > 768) {
        limitRes = 20;
    }


    // creation of query and make it json format
    let link = `http://35.180.182.8/search?keywords=${search.value}&language=${langRes}&limit=${limitRes}`;
    const res = await fetch(link);
    const resList = await res.json();

    // Get matches to current text input
    let matches = resList.entries.filter(resMatch => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return resMatch.name.match(regex);
    });

    if (searchText.length <= 1) {
        matches = [];
        matchList.innerHTML = '';
    }

    if (search.value == "") {
        matchList.innerHTML = '';
    }

    outputHtml(matches);

}



// Show results in HMTL
const outputHtml = matches => {
    if (matches.length > 0) {

        const html = matches.map(match => `
        <li onclick="changeSearchText('${match.name}')" class="mb-2 mt-2">
            ${match.name}
        </li>
        `).join('');

        matchList.innerHTML = html;



    }
};


function changeSearchText(name) {
    document.getElementById("search").value = name;
    matchList.innerHTML = '';
}