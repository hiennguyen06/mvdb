import axios from 'axios';

// Search Class model
// A class always has a constructor method. Then we pass the properties we want the constructor to have
export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults(query) {
        const apiKey = '11e296f9';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
    
        try {
            const res = await axios.get(`${proxy}http://www.omdbapi.com/?s=${this.query}&apikey=${apiKey}`);
            this.result = res.data.Search
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }

}
