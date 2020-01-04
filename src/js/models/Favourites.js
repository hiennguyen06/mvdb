export default class Favourites {
    constructor () {
        this.favourites = [];
    }

    addFavourites(id, title, img) {
        const favourite = { id, title, img };
        this.favourites.push(favourite);
        return favourite;
    }

    deleteFavourite(id) {
        const index = this.favourites.findIndex(el => el.id === id);
        // splice => [2,4,8] splice(1, 1) -> return 4, orginal arrauy is [2,8]; Mutates the original array
        // slice => [2,4,8] splice(1, 1) -> return 4, orginal arrauy is [2,4,8]; Does not change the orginal array
        this.favourites.splice(index, 1);
    }

    isFavourited(id) { // to test if we have a like already in the array. Need it to test the button
        return this.favourites.findIndex(el => el.id === id) !== -1;
    } 

    getNumFav() {
        this.favourites.length;
    }

}