const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movieContainer');
const inputBox = document.querySelector('.inputBox');

const getMovieDetails = async (movie) => {
    try {
        const apiKey = "a8f95d09";
        const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        showMovieData(data);
    }
    catch (error) {
        showError("No Movie Found.");
    }
}
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('emptyBackground');

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movieInfo');

    movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movieGenre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
    <p><strong>Duration: </strong>${Runtime}</p>
    <p><strong>Cast: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>`;

    const moviePoster = document.createElement('div');
    moviePoster.classList.add('movie-poster');
    moviePoster.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
}
const showError = (msg) => {
    movieContainer.innerHTML = `<h2>${msg}</h2>`;
    movieContainer.classList.add('emptyBackground');
}
searchForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieDetails(movieName);
    }
    else {
        showError("Enter movie name to get movie details...");
    }
});