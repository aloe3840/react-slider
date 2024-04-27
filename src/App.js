import logo from './logo.svg';
import './App.css';
import ImagesSlider from './components/img-slider/slider';

function App() {
  //https://picsum.photos/v2/list?page=1&limit=10 서버에서 제공하는 양식에 맞게끔 porps로 전달
  
  return (
    <div className="App">
      <ImagesSlider url={'https://picsum.photos/v2/list'} limit={'10'} page={'1'}/>
    </div>
  );
}



export default App;
