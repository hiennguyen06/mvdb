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
    elements.searchResPages.innerHTML = "";
};

// clear container 
// export const clearResultsContainer = () => {
//     elements.searchResList.style.display = "none";
// };

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

// render a single movie element
const renderMovie = movie => {
    const markup = `
        <div class="results__card">
            <a class="results__card--link" href=#${movie.imdbID}>
                <img src="${movie.Poster}" class="results__card--poster"/>
                <div class="results__card--data">
                    <p class="results__title">${movie.Title}</p>
                    <p class="results__year">${movie.Year}</p>
                </div>                                      
            </a>
        </div>
    `;

    // rendering to the DOM
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// Implementing pagination buttons
// Render the button based on the page we are on. If page 1, show go to page 2 button
// If page 2, show go to page 1 and page 3 etc.

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span class="btn__page-number">Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <div class="btn-icon">
            <i class="fas fa-chevron-${type === 'prev' ? 'left' : 'right'}"></i>
        </div>
    </button>
`;

const renderButtons = (page, totalResults, resPerPage) => {
    const pages = Math.ceil(totalResults / resPerPage);

    let button 
    if (page === 1 && pages > 1) {
        // button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // show both buttons 
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
 };

export const renderResults = (movies, page = 1, resPerPage = 8) => {
    // render results of the current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    movies.slice(start, end).forEach(renderMovie);

    // ToDO: render pagination
    renderButtons(page, movies.length, resPerPage);
};
