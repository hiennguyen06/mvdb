import axios from 'axios';

// Movie class Model
export default class Movie {
    constructor(id) {
        this.id = id;
    }

    async getMovie() {
        const apiKey = '11e296f9';
        const proxy = 'https://cors-anywhere.herokuapp.com/';       
        
        try {
            const res = await axios.get(`${proxy}http://www.omdbapi.com/?apikey=${apiKey}&i=${this.id}&type=movie&plot=short`);
            console.log(res);
            this.title = res.data.Title;
            this.img = res.data.Poster;
            this.plot = res.data.Plot;
            this.release = res.data.Released;
            this.director = res.data.Director;
            this.time = res.data.Runtime;
            this.rating = res.data.Ratings[0].Value;
            this.imdbID = res.data.imdbID
            this.imdbRating = res.data.imdbRating;
            this.imdbVotes = res.data.imdbVotes;
        } catch (error) {
            alert(error);
        }
    }
}