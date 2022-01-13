import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import Error404Page from './pages/Error404Page';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import bannerImage from './img/banner.jpg';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner image={bannerImage} text="К весне готовы!" />
            <Routes>
              <Route path="/diploma-react/" exact element={<HomePage/>} />
              <Route path="/diploma-react/catalog" element={<CatalogPage/>} />
              <Route path="/diploma-react/about" element={<AboutPage/>} />
              <Route path="/diploma-react/contacts" element={<ContactsPage/>} />
              <Route path="/diploma-react/catalog/:id" element={<ProductPage/>} />
              <Route path="/diploma-react/cart" element={<CartPage/>} />
              <Route path="*" element={<Error404Page/>} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
