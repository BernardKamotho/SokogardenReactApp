import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mpesapayment from './components/Mpesapayment';
// alias

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sokogarden - Buy & Sell Online</h1>
        </header>
        <nav>
          <Link to={'/'} className='links'>Get Products</Link>
          <Link to={'/addproducts'} className='links'>Add Products</Link>
          <Link to={'/signin'} className='links'>Signin</Link>
          <Link to={'/signup'} className='links'>Signup</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Getproducts/>} />
          <Route path='/addproducts' element={<Addproducts/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/mpesapayment' element={<Mpesapayment/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
