import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { Link, useNavigate } from 'react-router-dom';
interface Rating {
  id: number;
  Rating: number;
}
interface Author{
  id: number;
  name:string;
}
interface Publication{
  id:number;
  publication:string;
  publishedAt:Date;
}

interface Book {
  id: number;
  name: string;
  image:string;
  rating: Rating;
  author:Author; 
  publication:Publication
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CustomizedTables() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:4000/book', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        console.log(data); // Log the fetched books data
      })
      .catch((error) => console.error('Error:', error));
  }, []);


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



const handleDelete = (bookId: number) => {
  fetch(`http://localhost:4000/book/${bookId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error deleting book: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => {
      console.log('Book deleted successfully:', data);
      console.log('Navigating to /all_books');
      navigate('/all_books');
      
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here
    });
};

const handleUpdate = (bookId: number)=>{
  fetch(`http://localhost:4000/book/${bookId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error deleting book: ${response.statusText}`);
      }
      return response.json(); // If your server returns a JSON response
    })
    .then((data) => {
      console.log('Book updated successfully:', data);
      // Handle successful deletion here
      
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here
    });

}


  return (
    <div className='table'>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 800 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Book Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <StyledTableRow key={book.id} onClick={() => handleRowClick(book.id)}>
                <StyledTableCell component="th" scope="row">
                  {book.id}
                </StyledTableCell>
                <StyledTableCell align="right">{book.name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBook && (
        <div className='book_info'>
          <h2>Book Details</h2>
          <p><strong>ID:</strong> {selectedBook.id}</p>
          <p><strong>Book Name: </strong> {selectedBook.name}</p>
          <p><strong>Author:</strong> {selectedBook.author.name}</p> 
          <p><strong>Rating:</strong> {selectedBook.rating ? selectedBook.rating.Rating : 'N/A'}</p> 
          <div className='buttons'>
          <Button variant="contained" color="error" onClick={() => handleDelete(selectedBook.id)} > <DeleteForeverIcon /> Delete </Button>

          <Link to={`/update/${selectedBook.id}`}>
            <Button variant="contained" color="secondary">
              <EditSharpIcon /> Edit
            </Button>
          </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomizedTables;
