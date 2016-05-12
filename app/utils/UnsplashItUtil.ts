import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import {ImageEntity} from "./ImageEntity";

const URL:string = "https://unsplash.it";


@Injectable()
export class UnsplashItUtil {
  constructor(private http: Http) {
  }

  getListOfImages(thumbnailSize:number):Promise<ImageEntity[]>{
      
     return this.http.get(`${URL}/list`).map(res => res.json()).toPromise().then(unsplashEntities => {
        
        var imageEntities:ImageEntity[] = [];
        unsplashEntities.forEach(unsplashEntity => {
            var imageEntity = new ImageEntity(unsplashEntity.id, 
                            `${URL}/${thumbnailSize}?image=${unsplashEntity.id}`,
                            `${URL}/800?image=${unsplashEntity.id}`,
                            `${URL}/2400?image=${unsplashEntity.id}`);
            imageEntities.push(imageEntity);
        });
        return imageEntities;
     }).then(imageEntities => {
        // randomize the order
        var randomArray = this.shuffleArray(imageEntities.concat([]));
        return randomArray;
     });
  }
  
  shuffleArray(array):any[]{
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

