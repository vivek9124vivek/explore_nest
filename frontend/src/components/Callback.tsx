import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Callback: React.FC = () => {
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await handleRedirectCallback();
        window.location.href = '/add_book'; // Redirect to a protected route or homepage
      } catch (error) {
        console.error('Error handling callback:', error);
        // Optionally redirect to an error page or display a user-friendly message
        window.location.href = '/error'; // Redirect to an error page
      }
    };

    handleAuth();
  }, [handleRedirectCallback]);

  return <div>Loading...</div>;
};

export default Callback;
