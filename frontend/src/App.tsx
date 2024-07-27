import ButtonAppBar from './components/Navbar';
import Home from './components/Home';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CustomizedTables from './components/Table';
import Update from './components/Update';
function App() {

  return (
    // <>

    // <ButtonAppBar />
    // <Home />
    // <BookTable />
    
    // </>

<BrowserRouter>
<ButtonAppBar />
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/all_books" element={<CustomizedTables />} />
        <Route path="/update/:bookId" element={<Update />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
