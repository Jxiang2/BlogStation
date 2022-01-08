import { BrowserRouter, Route, Switch } from 'react-router-dom';

// pages and components
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Create from './pages/Create'
import ProjectDetail from './pages/ProjectDetail'

// stules
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <Switch><Route exact path='/'><Dashboard/></Route></Switch>
          <Switch><Route exact path='/create'><Create/></Route></Switch>
          <Switch><Route exact path='/signup'><Signup/></Route></Switch>
          <Switch><Route exact path='/projects/:id'><ProjectDetail/></Route></Switch>
          <Switch><Route exact path='/login'><Login/></Route></Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
