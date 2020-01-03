import { elements } from './base';

// clear the old recipeView 
export const clearMovie = () => {
    elements.movie.innerHTML = '';
};

export const renderMovie = movie => {
    const markup = `
    <div class="poster">
        <img src="${movie.img}" alt="Movie Poster" class="poster__img">
    </div>

    <div class="info">
        <div class="movie-info">

            <h1 class="movie-info movie-info__title">${movie.title}</h1>

            <div class="movie-info movie-released">
                <h2 class="movie-released__heading">Release date</h2>
                <p class="movie-released__date">${movie.release}</p>
            </div>

            <div class="movie-info movie-length">
                <h2 class="movie-length__heading">Length</h2>
                <p class="movie-length__time">${movie.time}</p>
            </div>

            <div class="movie-info movie-director">
                <h2 class="movie-director__heading">Director</h2>
                <p class="movie-director__name">${movie.director}</p>
            </div>

            <div class="movie-info movie-rating">
                <h2 class="movie-rating__heading">IMDB Rating</h2>
                <p class="movie-reating__time">${movie.rating}</p>
            </div>

            <div class="movie-info movie-plot">
                <h2 class="movie-plot__heading">Storyline</h2>
                <p class="movie-plot__text">${movie.plot}</p>
            </div>

        </div>
    </div>
    `;

    elements.movie.insertAdjacentHTML('afterbegin', markup);

    const truncateText = (selector, maxLength) => {
        const element = document.querySelector(selector);
        let truncated = element.innerText;
    
        if (truncated.length > maxLength) {
            truncated = truncated.substr(0,maxLength) + '...';
        }
        return truncated;
    }
    
    document.querySelector('.movie-plot__text').innerText = truncateText('.movie-plot__text', 380);
};
