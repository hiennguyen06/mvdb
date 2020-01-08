import Search from './models/Search';
import Movie from './models/Movie';
import Favourites from './models/Favourites';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as favouritesView from './views/favouritesView';
import { elements, renderLoader, clearLoader, setFocusToInput, renderHome } from './views/base';
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
        clearHome();
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchLoad);
        movieView.clearMovie();

        // 4. Search for movies
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
    // console.log(id);

    // if there is an id
    if (id) 
    // Prepare UI for changes
    clearHome();
    movieView.clearMovie();
    searchView.clearResults();
    // searchView.clearResultsContainer();
    renderLoader(elements.searchLoad);

    // Create a new Movie object
    state.movie = new Movie(id); // creates a new movie object and adds it to the state

    try {
        // Get the Movie data
        await state.movie.getMovie();
    
        // Render Movie to UI
        clearLoader();
        movieView.renderMovie(
            state.movie,
            state.favourites.isFavourited(id)
        );
        // console.log(state.movie); // console log the state.movie for now. Clicking on each movie will render a new id in the console.

    } catch (error) {
        alert('Errror processing movie');
    }

}

// TESTING

// Favourite controller 
const controlFavourite = () => {
    // if we don't already have an exisiting favourited movie
    if (!state.favourites) state.favourites = new Favourites();
    // save id of current movie
    const currentID = state.movie.id;
    // console.log(currentID);

    // User has not liked the current movie
    if (!state.favourites.isFavourited(currentID)) {
        // add the favourite to the state
        const newFavourite = state.favourites.addFavourites(
            currentID,
            state.movie.title,
            state.movie.release,
            state.movie.img
        )

        // Toggle the favourites button
        favouritesView.toggleFavouriteBtn(true);

        // Render the UI list
        favouritesView.renderFavourite(newFavourite);
        console.log(state.favourites);

    }  else {
        // Remove like to the state
        state.favourites.deleteFavourite(currentID);

        // Toggle the like button
        favouritesView.toggleFavouriteBtn(false);

        // Remove Like to UI list
        favouritesView.removeFavourite(currentID);
        // console.log(state.favourites)
    }

    // Toggle the like menu when there is more than 1 like
    favouritesView.toggleFavouriteMenu(state.favourites.getNumFav());
}

// Restore likes recipe on page load
window.addEventListener('load', () => {
    state.favourites = new Favourites();
    
    // restore the likes
    state.favourites.readStorage();

    // toggle the like button
    favouritesView.toggleFavouriteMenu(state.favourites.getNumFav());

    // render the existing likes
    state.favourites.favourites.forEach(favourite => favouritesView.renderFavourite(favourite));
});


['hashchange'].forEach(event => window.addEventListener(event, controlMovie));
// EVENT LISTENERS

// Event Listener - Search and prevent default form behaviour
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

// Event listener for container
elements.movie.addEventListener('click', e => {
    
   if (e.target.matches('.add, .add *')) {
       controlFavourite();
       
   } else if (e.target.matches('.back, .back *')) {
    movieView.clearMovie();
    setFocusToInput();
    searchView.renderResults(state.search.result);
   }
})



// Clear the entire conatiner

// const clearContent = () => {
//     document.querySelector('.results__container').style.display = "none";
// };

const clearHome = () => {
    document.querySelector('.home').style.display = "none";
}


// On page reload
// window.addEventListener('load', () => {
//     // renderHome();
// });

// set focus to form input automatically 
setFocusToInput();


// Testing instance of Search
// const search = new Search('Harry');
// search.getResults();
// console.log(search);

//Testing instance of Movie
// const m = new Movie('tt0241527');
// m.getMovie();
// console.log(m);

