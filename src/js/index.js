import Search from './models/Search';
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

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// const search = new Search('Harry');
// search.getResults();
// console.log(search);