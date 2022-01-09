import { BrowserRouter, Route, Switch } from 'react-router-dom';

// pages and components
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Create from './pages/Create'
import ProjectDetail from './pages/ProjectDetail'
import Navbar from './components/Navbar';

// stules
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar/>
        <div className='container'>
          <Navbar/>
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
