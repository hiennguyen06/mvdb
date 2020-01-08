export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__container'),
    searchLoad: document.querySelector('.results__container'),
    searchResPages: document.querySelector('.results__pages'),
    movie: document.querySelector('.movie'),
    favouritesMenu: document.querySelector('.favourites-container')
};

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class= "loader">
            <svg>
                <use href="images/icons.svg#icon-spinner2"></use>
            </svg>
            <span class="loading">loading</span>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

export const setFocusToInput = () => {
    document.querySelector('.search__field').focus();
};


// export const renderHome = () => {
//     const markup = `
//     <div class="home">
//         <div class="home__banner">
           
//         </div>
//     </div>
//     `;
//     elements.searchResList.insertAdjacentHTML('beforeend', markup);
// };
