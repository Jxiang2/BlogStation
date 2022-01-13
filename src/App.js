import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// pages and components
import Dashboard from './pages/DashboardPage/Dashboard'
import Login from './pages/LoginPage/Login'
import Signup from './pages/SignupPage/Signup'
import Create from './pages/CreatePage/Create'
import ProjectDetail from './pages/ProjectDetailPage/ProjectDetail'
import Navbar from './components/Navbar/Navbar';
import Account from './pages/AccountPage/Account';

// context
import { useAuthContext } from './hooks/useAuthContext';

// stules
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';

function App() {

  const { user, authIsReady} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar/>}

          <div className='container'>
            <Navbar/>

            <Switch><Route exact path='/'>
              {user && <Dashboard/>}
              {!user && <Redirect to='/login'/>}
            </Route></Switch>

            <Switch><Route exact path='/create'>
              {user && <Create/>}
              {!user && <Redirect to='/login'/>}
            </Route></Switch>

            <Switch><Route exact path='/signup'>
              {!user && <Signup/>}
              {user && <Redirect to='/'/>}
            </Route></Switch>

            <Switch><Route exact path='/projects/:id'>
              {user && <ProjectDetail/>}
              {!user && <Redirect to='/login'/>}
            </Route></Switch>

            <Switch><Route exact path='/login'>
              {!user && <Login/>}
              {user && <Redirect to='/'/>}
            </Route></Switch>

            <Switch><Route exact path='/account'>
              {user && <Account/>}
              {!user && <Redirect to='/login'/>}
            </Route></Switch>
          </div>

        {user && <UserList/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
