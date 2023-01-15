
import './App.css';
import NavBar from './components/NavBar';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <div >
      <NavBar />
      {element}
    </div>
  );
}

export default App;
