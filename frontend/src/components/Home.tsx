import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import '../App.css'

import { Link, useNavigate } from 'react-router-dom';
import BookCard from './BookCard';


const Home = () => {
    
  const navigate= useNavigate();

  const { user, loginWithRedirect } = useAuth0();
  console.log('user:', user)
    

    const [values,setValues] = useState({
      name:'',
      rating:'',
      author:'',
    })

    

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
          const response = await fetch('http://localhost:4000/book', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache',
              },
              body: JSON.stringify(values), // Send form data as JSON
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Success:', data);
          navigate('/all_books');
          // Handle success, perhaps show a success message or redirect
      } catch (error) {
          console.error('Error:', error);
          // Handle error, show error message
      }
  };
   
    
    


  return (

    <div className='home'>
{/* <h1 className='add_book'>Add Book Details</h1>
   <form onSubmit={handleSubmit}>
    <div className='inputs'>

    <TextField
                        required
                        id="outlined-required"
                        label="Book Name"
                        value={values.name} // Ensure this value is controlled
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                    />
     <TextField
                        required
                        id="outlined-required"
                        label="Rating"
                        value={values.rating} // Ensure this value is controlled
                        onChange={(e) => setValues({ ...values, rating: e.target.value })}
                    />
     <TextField
                        required
                        id="outlined-required"
                        label="Author"
                        value={values.author} // Ensure this value is controlled
                        onChange={(e) => setValues({ ...values, author: e.target.value })}
                    />
        
        <Button variant="contained" color="primary" type="submit">
                        Add
                    </Button>

    </div>
    </form>
  <Link to='/all_books'>
  
    <Button variant="contained" className='all_book'>All Books</Button>
  </Link> */}
  <div className='bookcard_grid'>

  <BookCard />
  </div>
  
    </div>
  )
}

export default Home