import { get } from 'lodash';


export default class Songs {
    type: String;
    artistId: String;
    collectionId: String; 
    artistName: String;
    collectionName: String;
    censoredName: String;
    artistViewUrl: String;
    collectionViewUrl: String;
    artworkUrl60: String;
    artworkUrl100: String;
    collectionPrice: String;
    collectionExplicitness: String;
    copyright: String;
    country: String;
    currency: String;
    releaseDate: String;
    genre: String;
    previewUrl: String;
    description : String;

    constructor(songs: any){
      this.type = get(songs,'wrapperType');
      this.artistId = get(songs,'artistId');
      this.collectionId = get(songs,'collectionId');
      this.artistName = get(songs,'artistName');
      this.collectionName = get(songs,'collectionName');
      this.censoredName = get(songs,'collectionCensoredName');
      this.artistViewUrl = get(songs,'artistViewUrl');
      this.collectionViewUrl = get(songs,'collectionViewUrl');
      this.collectionId = get(songs,'collectionId');
      this.artworkUrl60 = get(songs,'artworkUrl60');
      this.artworkUrl100 = get(songs,'artworkUrl100');
      this.collectionPrice = get(songs,'collectionPrice');
      this.collectionExplicitness = get(songs,'collectionExplicitness');
      this.copyright = get(songs,'copyright');
      this.country = get(songs,'country');
      this.currency = get(songs,'currency');
      this.releaseDate = get(songs,'releaseDate');
      this.genre = get(songs,'primaryGenreName');
      this.previewUrl = get(songs,'previewUrl');
      this.description = get(songs,'description');
    }
}

  
  