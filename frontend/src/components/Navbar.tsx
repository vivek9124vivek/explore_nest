import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookIcon from '@mui/icons-material/Book';
import '../App.css'
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useSearch } from '../context/SearchContext';



const ButtonAppBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [time, setTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const {  user,isAuthenticated, loginWithRedirect ,logout } = useAuth0();
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
      setDate(now.toLocaleDateString());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <BookIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Books
          </Typography>

          <input type="text" name="" id="input" placeholder='🔍 Search'  value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} />
          

          <span className='time'>{time}</span>
          <span className='time'>{date}</span>
          
          <p>{user?.name}</p>
          
          
          {isAuthenticated ? (
        <div>
          <button
            className="authentication"
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin } });
              
            }}
          >
            Log Out
          </button>
          
        </div>
      ) : (
        <div>
          <button
            className="authentication"
            onClick={() => {
              loginWithRedirect();
            }}
          >
            Log In
          </button>
          
        </div>
      )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar;