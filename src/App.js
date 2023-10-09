import { useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  useEffect(() => {
    fetch('http://localhost:8888/api/index', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Testing LG & Samsung Deployment</h1>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
