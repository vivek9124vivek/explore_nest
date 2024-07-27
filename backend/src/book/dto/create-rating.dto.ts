export class CreateRatingDto{
    Rating_ID: number;
    Rating: number;
    constructor(Rating_ID: number,Rating: number){
        this.Rating_ID = Rating_ID;
        this.Rating = Rating;
    }

}