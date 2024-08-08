import '../App.css'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
const LeftSideBar = () => {

    
  return (
  
    <div className='leftsidebar'>
        <div className='leftsidebar_text'>
       <h2>My  <span>Book</span></h2>
         <h1>Shelf</h1>
        </div>
        <div className='leftsidebar_icon'>
            <Link to='/'> <Button><HomeIcon /> Home</Button> </Link>
            <Link to='/add_book'> <Button><span>+</span> Add Book</Button></Link>
        </div>
    </div>
        
  )
}

export default LeftSideBar