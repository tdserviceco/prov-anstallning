import { Link } from 'react-router-dom'
import './App.css'
function App() {

  return (
    <div className="container column center ">
      <img class={'flickr'} src='./flickr.png' alt='Flickr' />
      <Link to={'/images'}>
        Search for images
      </Link>
    </div>
  )
}

export default App
