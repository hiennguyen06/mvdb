import Search from './models/Search';
import Movie from './models/Movie';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
// State: data in a given moment, in place in one object. Redux is a state management library
// Global state of the app
// Search Object
// Current recipe object
// Shopping list object
// Liked recipes
// When we reload the app, the state will be empty. Later we will implement local Storage

const state = {}

// SEARCH CONTROLLER 

const controlSearch = async () => {
    // 1. Get the query from view
    const query = searchView.getInput();

    if (query) {
        // 2 New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchLoad);

        // 4. Search for recipes
        await state.search.getResults(); // returns a promise (every async function returns a promise) so we need to await

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

// MOVIE CONTROLLER 
const controlMovie = async () => {
    
    // Get the ID from the hash URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    // if there is an id
    if (id) 
    // Prepare UI for changes
    // Create a new Movie object
    state.movie = new Movie(id); // creates a new movie object and adds it to the state

    try {
        // Get the Movie data
        await state.movie.getMovie();
    
        // Render Movie to UI
        console.log(state.movie); // console log the state.movie for now. Clicking on each movie will render a new id in the console.

    } catch (error) {
        alert('Errror processing movie');
    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlMovie));
// EVENT LISTENERS

// Event Listener - Search
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Event Listener - Pagination
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 5);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// Testing instance of Search
// const search = new Search('Harry');
// search.getResults();
// console.log(search);

//Testing instance of Movie
// const m = new Movie('tt0241527');
// m.getMovie();
// console.log(m);

