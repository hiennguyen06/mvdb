import { elements } from './base';

export const toggleFavouriteBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.movie__favourite--love use').setAttribute('href', `images/icons.svg#${iconString}`);    
};

export const toggleFavouriteMenu = numFav => {
    elements.favouritesMenu.style.visibility = numFav > 0 ? 'visible' : 'hidden';
};

export const renderFavourite = favourite => { // favourite is returned from the model
    const img = favourite.img === 'N/A' ? `<img src="http://www.newdesignfile.com/postpic/2015/02/no-icon-available_68024.png"> ` : ` <img src="${favourite.img}"/>`

    const markup = `
        <a class="favourites-container__likes" href="#${favourite.id}">
            ${img}
            <div class="favourites-container__infos">
                <h class="favorites-container__infos-title">${favourite.title}</h>
                <p class="favorites-container__infos-text">${favourite.release}</p>
            </div>
        </a>
    `;

    elements.favouritesMenu.insertAdjacentHTML('beforeend', markup);
};

export const removeFavourite = id => {
    const el = document.querySelector(`.favourites-container__likes[href*="${id}"]`);
    if (el) el.parentElement.removeChild(el); // if this an element, remove it
};

// export const removeFavourite = id => {
//     if (id) {
//       const favourite = document.querySelector(`.favourites-container__likes[href*="#${id}"]`);

//       if (favourite) {
//         favourite.parentElement.removeChild(favourite);
//       }
//     }
// };
