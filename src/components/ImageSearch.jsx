import React, { useState } from 'react';
import axios from 'axios';
import ImageResult from './ImageResult';
const ImageSearch = () => {
  const [galleryDisplay, setGalleryDisplay] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [result, setResult] = useState(null);
  const updateSearchWord = (e) => {
    // console.log(e.target.value); //Debug to see if I get right value
    setSearchWord(e.target.value) //Update the value of the each key we input in the field. 
  }

  const getSearchWord = async () => {
    try {
      setGalleryDisplay(false) //Every time we do a search or "new" search we set our gallery with our favourite images on to false so we hide it.
      if (searchWord !== '') { //Empty is not adviced we just return it till you insert a word/letter. 
        const flickrData = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${import.meta.env.VITE_KEY}&is_commons=true&in_gallery=true&content_type=1&safe_search=1&text=${searchWord}&tags=${searchWord}&media=photos&format=json&nojsoncallback=1`);
        setResult(flickrData.data.photos.photo); //Save the data from Flickr API from const FlickData 
      }
      else {
        return;
      }
    } catch (err) { // Error handle from Axios
      console.error(err.message);
    }
  }

  return (
    <div className='search'>
      <label htmlFor='search' className='container flex-start column'>
        <span>Type image type</span>
        <input id="search" onChange={updateSearchWord} />
        <button type="button" onClick={getSearchWord}>Search</button>
      </label>
      <div className='container'>
        <ImageResult
          images={result}
          displayGallery={setGalleryDisplay}
          galleryDisplay={galleryDisplay}
        />
      </div>
    </div>
  );
};

export default ImageSearch;