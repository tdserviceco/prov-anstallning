import React, { useState } from 'react';
import ImageGallery from './ImageGallery';

const ImageResult = ({ images, displayGallery, galleryDisplay }) => {
  const [galleryState, setGalleryState] = useState(null)
  const gallery = [] //Our array to store our favourite images

  const loopImages = () => {
    return images.map(image => <li key={image.id}>
      <img src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_${'q'}.jpg`} alt={image.title} />
      <label>
        <input type="checkbox" id="save" value={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_${'q'}.jpg`} />
        <span>Save</span>
      </label>
    </li>)
  }

  const createGallery = (form) => {
    form.preventDefault();
    for (let i = 0; i < form.target.length; i++) { //Loop through form.target (each target has an array) but condition check if each target has a checkmark on it, then save the targets value inside array called gallery with push.
      if (form.target[i].checked === true) {
        // console.log(form.target[i].value) //Debug mode
        gallery.push([form.target[i].value])
      }
    }
    setGalleryState(gallery)
    displayGallery(true);
  }

  return (
    <>
      {!galleryDisplay ? <>
        {images !== null && images.length !== 0 ? //We check if images variable contains either something in an array otherwise we just send out a text saying we got result of 0
          <div className={`result-of-${images.length}`}>
            <h2>{`result of ${images.length} found`}</h2>
            <form onSubmit={createGallery}>
              <ul>
                {loopImages()}
              </ul>
              <input type="submit" value={'Show Gallery'} />
            </form>
          </div>
          :
          <div className='result-empty'>
            <h2>result of 0 found</h2>
          </div>}</>
        :
        <ImageGallery gallery={galleryState} />
      }
    </>
  );
};

export default ImageResult;