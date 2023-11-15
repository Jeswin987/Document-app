import './App.css';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import DocumentList from './components/DocumentList';
import Document from './components/Document';
import Header from './components/Header';

function App() {
  

  return (
    <> 
    <Header/>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/documentlist' element={<DocumentList/>}></Route>
      <Route path='/document/:id' element={<Document/>}></Route>
    </Routes>

    <Footer/>
    </>
  );
}

export default App;
