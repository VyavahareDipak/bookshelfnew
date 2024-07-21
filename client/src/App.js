import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar' ;
 import Home from './pages/Home';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Signup from './pages/Signup';
import { useContext} from 'react';
import PrivateRoute from './components/PrivateRoute';
import SendPost from './pages/SendPost';
import { AppContext } from './context/AppContext';
function App() {

  // user is loged in or not
  const {islogin}= useContext(AppContext) ;

  return (
    <div className='App'>
      <Navbar islogin={islogin} />

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* passing props to components in route */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/sendPost' element={
          <PrivateRoute>
          <SendPost/>
          </PrivateRoute>}></Route>
      {/* making dashboard private route so we can redirect to dashboard only if logged in */}
        <Route path='/dashboard' element=
        {
        <PrivateRoute >
          <DashBoard/>
       </PrivateRoute>
        }
        ></Route>
       
      </Routes>
    </div>
  );
}

export default App;
