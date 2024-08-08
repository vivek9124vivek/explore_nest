import { Rating, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const AddBook = () => {
  const navigate = useNavigate();
 
  const [values, setValues] = useState({
    name: '',
    image: '',
    rating: 0,
    author: '',
    publication: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!values.name || !values.image || !values.rating || !values.author || !values.publication) {
        throw new Error('All fields are required');
      }

      const response = await fetch('http://localhost:4000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          name: values.name,
          image: values.image,
          rating: values.rating, // Convert rating to a number
          author: values.author,
          publication: values.publication
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      toast.success("Book added successfully");
      navigate('/');
      
    } catch (error) {
      console.error('Error add book:', error);
      // Handle error, show error message
    
    }
  };

  return (
    <div className='book_form'>
      <h1 className='add_book'>Add Book Details</h1>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <TextField
            required
            id="outlined-required"
            label="Book Name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <TextField
            required
            id="outlined-required"
            label="Image"
            value={values.image}
            onChange={(e) => setValues({ ...values, image: e.target.value })}
          />
          {/* <TextField
            required
            id="outlined-required"
            label="Rating"
            value={values.rating}
            onChange={(e) => setValues({ ...values, rating: e.target.value })}
          /> */}

          <div className='typography'>
          <Typography  component="legend">Rating</Typography>
<Rating
            name="simple-controlled"
            value={values.rating}
            onChange={(event, newValue) => {
              setValues({ ...values, rating: newValue || 0 });
            }}
          />
          </div>

          <TextField
        
            required
            id="outlined-required"
            label="Author"
            value={values.author}
            onChange={(e) => setValues({ ...values, author: e.target.value })}
          />
          <TextField
            required
            id="outlined-required"
            label="Publication"
            value={values.publication}
            onChange={(e) => setValues({ ...values, publication: e.target.value })}
          />
          <Button variant="contained" color="primary" type="submit" >
            Add  
            
          </Button>
        </div>
      </form>
    
    </div>
  );
};

export default AddBook;
