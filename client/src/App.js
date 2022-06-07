import './App.css';
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import CreateForm from './components/CreateForm';
function App() {
 
  return (
    <div className='app'>
    <Switch>
      <Route exact path={'/'} >
    <Landing/>
      </Route>
      <Route path={'/Home'}>
        <Home/>
      </Route>  
      <Route path={`/videogames/:id`}>
        <Detail/>
      </Route>  
      <Route path={'/create'}>
        <CreateForm/>
      </Route>  
    </Switch>
    </div>
  );
}

export default App;
