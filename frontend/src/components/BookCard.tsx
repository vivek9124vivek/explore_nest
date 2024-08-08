// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Rating from '@mui/material/Rating';
// import { useSearch } from '../context/SearchContext';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Book {
//   id: number;
//   name: string;
//   image: string;
//   rating: number;
//   author: string;
//   publication: string;
//   publishedAt: string;
// }

// export default function FullWidthGrid() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const { searchQuery } = useSearch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetch('http://localhost:4000/book', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Cache-Control': 'no-cache',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setBooks(data);
//         console.log(data); // Log the fetched books data
//       })
//       .catch((error) => console.error('Error bookcard:', error));
//   }, []);

//   console.log('books', books);

//   // Filter books based on search query
//   const filteredBooks = books.filter((book) =>
//     book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.publication.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Determine which books to display
//   const booksToDisplay = searchQuery ? filteredBooks : books;

//   const handleCardClick = (bookId: number) => {
//     navigate(`/book/${bookId}`);
//   };

//   return (
//     <div className="book_card">
//       <Box sx={{ flexGrow: 1 }} maxWidth={1000}>
//         <Grid className="outer_grid" container spacing={1}>
//           {booksToDisplay.map((book) => (
//             <Grid key={book.id} item xs={6} md={4} >
//               <Card sx={{ maxWidth: 291, minWidth:300 }} className='card' onClick={() => handleCardClick(book.id)} >
//                 <CardMedia
//                   sx={{ height: 452 }}
//                   image={book.image}
//                   title={book.name}
//                   className='card_img'
                  
//                 />
//                 <CardContent>
                 
//                   <p>{book.name}</p>
//                   {/* <Typography variant="body2" color="text.secondary">
//                     Author: {book.author}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Publication: {book.publication}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Published At: {new Date(book.publishedAt).toLocaleDateString()}
//                   </Typography> */}
//                   <Rating name="read-only" value={book.rating} readOnly />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </div>
//   );
// }





import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import { useSearch } from '../context/SearchContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  name: string;
  image: string;
  rating: number;
  author: string;
  publication: string;
  publishedAt: string;
}

interface PaginatedResponse {
  totalItems: number;
  totalPages: number;  // Make sure your backend includes this field
  currentPage: number;
  books: Book[];
}

export default function FullWidthGrid() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0); // Initialize totalPages state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchQuery } = useSearch();
  const limit = 3;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/book?page=${currentPage}&limit=${limit}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => response.json())
      .then((data: PaginatedResponse) => {
        setBooks(data.books);
        setTotalPages(data.totalPages); // Set totalPages from response
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, [currentPage]);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.publication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine which books to display
  const booksToDisplay = searchQuery ? filteredBooks : books;

  const handleCardClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="book_card">
      <Box sx={{ flexGrow: 1 }} maxWidth={1000}>
        <Grid className="outer_grid" container spacing={1}>
          {booksToDisplay.map((book) => (
            <Grid key={book.id} item xs={6} md={4}>
              <Card sx={{ maxWidth: 291, minWidth: 300 }} className='card' onClick={() => handleCardClick(book.id)}>
                <CardMedia
                  sx={{ height: 452 }}
                  image={book.image}
                  title={book.name}
                  className='card_img'
                />
                <CardContent>
                  <p>{book.name}</p>
                  <Rating name="read-only" value={book.rating} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className='pagination'
      />
    </div>
    
  );
}


