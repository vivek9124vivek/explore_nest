import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Rating {
  id: number;
  Rating: number;
}
interface Author {
  id: number;
  name: string;
}

interface Book {
  id: number;
  name: string;
  rating: Rating;
  author: Author;
}

const Update = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [values, setValues] = useState({
    name: '',
    rating: '',
    author: '',
  });

  const navigate= useNavigate();

  useEffect(() => {
    if (bookId) {
      handleRowClick(parseInt(bookId));
    }
  }, [bookId]);

  useEffect(() => {
    if (selectedBook) {
      setValues({
        name: selectedBook.name,
        rating: selectedBook.rating.Rating.toString(),
        author: selectedBook.author.name,
      });
    }
  }, [selectedBook]);

  const handleRowClick = (bookId: number) => {
    fetch(`http://localhost:4000/book/${bookId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching book: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 
        setSelectedBook(data); 
      })
      .catch((error) => console.error('Error:', error));
  };


  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/book/${bookId}`, {
        method: 'PATCH',
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
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <h1 className="add_book">Update Book Details</h1>
      <form onSubmit={handleUpdate}>
        <div className="inputs">
          <TextField
            required
            id="outlined-required"
            label="Book Name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            value={values.name}
          />
          <TextField
            required
            id="outlined-required"
            label="Rating"
            onChange={(e) => setValues({ ...values, rating: e.target.value })}
            value={values.rating}
          />
          <TextField
            required
            id="outlined-required"
            label="Author"
            onChange={(e) => setValues({ ...values, author: e.target.value })}
            value={values.author}
          />

          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default Update;
