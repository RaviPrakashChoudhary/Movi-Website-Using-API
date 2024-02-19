//TMDB

const Api_Key = 'api_key=9416751788d816abee0d0874bfa83bde';
const base_Url = 'https://api.themoviedb.org/3';
const Api_Url = base_Url + '/discover/movie?' + Api_Key;
const image_Url = 'https://image.tmdb.org/t/p/w500';
const harryPotter_Url = base_Url + '/search/movie?query=' + 'harry potter' + '&' + Api_Key;
const harryPotterbtn = document.querySelector('.harryPotterbtn');
const main = document.querySelector('.main');
const home = document.querySelector('.home');
const TitleText = document.querySelector('.popularh4');


const form = document.querySelector('#form');
const search = document.querySelector('.search');


getMovie(Api_Url);

function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
    <img src= "${image_Url + poster_path}" alt="${title}">
            <div class="movieInfo">
                <H3>${title}</H3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="details">
                <h3>Overview</h3><br>
                ${overview}
            </div>`
        main.appendChild(movieEl);
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {

    } return 'red'
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchName = search.value;
    if (searchName) {
        const search_Url = base_Url + '/search/movie?query=' + searchName + '&' + Api_Key;
        getMovie(search_Url)
        TitleText.innerHTML = (searchName);

    }else {
        getMovie(Api_Url);
        TitleText.innerHTML = "Popular Movies";
        search.value="";

    }
})

harryPotterbtn.addEventListener('click', () => {
    console.log('harry');
    TitleText.innerHTML = "Harry Potter";
    getMovie(harryPotter_Url);
})

home.addEventListener('click', () => {
    getMovie(Api_Url);
    TitleText.innerHTML = "Popular Movies";

})