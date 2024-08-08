import ButtonAppBar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CustomizedTables from './components/Table';
import Update from './components/Update';
import LeftSideBar from './components/LeftSideBar';
import { SearchProvider } from './context/SearchContext';
import AddBook from './components/AddBook';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import Callback from './components/Callback';
import BookDetail from './components/BookDetail';

function App() {

  

  return (
    <BrowserRouter>
    <SearchProvider>
      <ButtonAppBar />
      <LeftSideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all_books" element={<CustomizedTables />} />
        <Route path="/update/:bookId" element={<Update />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/add_book" element={<PrivateRoute element={<AddBook />} />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
      <ToastContainer />
    </SearchProvider>
  </BrowserRouter>
   
  )
}

export default App




