import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { TextField, Box, useTheme, useMediaQuery } from '@mui/material';

export const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedOnSearch = _.debounce(onSearch, 300);

  useEffect(() => {
    debouncedOnSearch(searchTerm);
    return () => debouncedOnSearch.cancel();
  }, [searchTerm, debouncedOnSearch]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        padding: isMobile ? '1rem' : '2rem',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        sx={{
          width: isMobile ? '100%' : '70%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
        }}
      />
    </Box>
  );
};