import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import BRegister from './Screens/Buyer/Register/BRegister';
import SRegister from './Screens/Seller/Register/SRegister';
import MRegister from './Screens/Manufacturer/Register/MRegister';
import Products from './Screens/Manufacturer/Products/Products';
import AddProduct from './Screens/Manufacturer/AddProducts/AddProduct';
import Footer from './Components/Footer/Footer';
import Admin from './Screens/Admin/Admin';

function App() {
  return (
    <div className="App">
     {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
    <Navbar/>
    <Admin/>
    {/* <AddProduct/> */}
    {/* <Products/> */}
    {/* <BRegister/>
    <SRegister/> */}
    {/* <MRegister/> */}
    <Footer/>

    </div>
  );
}

export default App;
