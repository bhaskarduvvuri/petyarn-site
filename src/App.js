import petyarn from "./petyarn.png";
import "./App.css";
import FileUpload from "./components/FileUpload";
import { PetGallery } from "./components/PetGallery";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={petyarn} alt="logo" className="App-logo" />
        </div>
        <FileUpload />
      </header>
      <h2>Gallery (Click on the image to like)</h2>
      <PetGallery />
      <a href='https://www.freepik.com/photos/background'>Background photo created by bublikhaus - www.freepik.com</a>
    </div >
  );
}

export default App;
