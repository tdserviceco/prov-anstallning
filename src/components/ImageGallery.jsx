import React from 'react';

const ImageGallery = ({ gallery }) => {

  const LoopGallery = () => {
    return gallery.map((image, key) => <li key={key}><img key={image} src={image} alt={image} /></li>)
  }

  return (
    <>
      <h2>Your favourite saved pictures</h2>
      <ul className='container center'>
        {gallery.length !== 0 ? LoopGallery() : <li>You forgot to save any favourite pictures</li>}
      </ul>
    </>
  );
};

export default ImageGallery;