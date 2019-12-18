import { elements } from './base';

// get the value of the form and export to controller
export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
    // clear the search input 
    elements.searchInput.value = "";
};

// clear the results 
export const clearResults = () => {
    elements.searchResList.innerHTML = "";
};

// limit the title length
// const limitMovieTitle = (title, limit = 17) => {
//     const newTitle = [];
//     if (title.length > limit) {
//         title.split(' ').reduce((acc, cur) => {
//             if (acc + cur.length <= limit) {
//                 newTitle.push(cur);
//             }
//             return acc + cur.lenth;
//         }, 0);

//         return `${newTitle.join(' ')} ...)`;
//     }
//     return title
// }

const renderMovie = movie => {
    const markup = `
        <div class="results__card">
            <img src="${movie.Poster}"/>
            <div class="results__card--data">
                <div>
                <h2 class="results__title">${movie.Title}</h2>
                <p class="results__year">${movie.Year}</p>
                </div>
            </div>                                      
        </div>
    `;

    // rendering to the DOM
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = movies => {
    movies.forEach(renderMovie);
};