import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating'; // Ensure you import Rating if you use it
import Typography from '@mui/material/Typography';

interface Publication {
    id: number;
    publication: string;
    publishedAt: string;
  }
interface Rating {
    Rating_ID: number;
    Rating:number
  }
interface Author {
    id: number;
    name:number
  }

interface Book {
    id: number;
    name: string;
    image: string;
    author: Author;
    rating: Rating; // Ensure this is a number
    publications: Publication;
   
  }

function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/book/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched book:', data);
        // Ensure rating is a number
        // const bookData: Book = { ...data, rating: Number(data.rating) };
        setBook(data);
      })
      .catch((error) => console.error('Error bookDetail:', error));
  }, [id]);
console.log("Book",book)
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className='book_detail'>
      <div>

      {book.image && <img src={book.image} alt={book.name} width={250} height={350} />}
      </div>

      <div>

      
      <h1>{book.name}</h1>
     <Typography variant="body2" color="text.secondary">
                    Author: {book.author.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Publication: {book.publications.publication}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Published Date: {new Date(book.publications.publishedAt).toLocaleDateString()}
                  </Typography>
      
      
      <Rating name="read-only" value={book.rating.Rating} readOnly />
      </div>
    </div>
  );
}

export default BookDetail;
