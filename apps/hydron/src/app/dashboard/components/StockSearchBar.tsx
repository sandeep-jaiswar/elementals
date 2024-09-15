// app/dashboard/components/StockSearchBar.tsx
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface StockSearchBarProps {
  onSearch: (searchValue: string) => void;
}

const StockSearchBar: React.FC<StockSearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue) {
      onSearch(searchValue);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search stock (e.g., AAPL, TSLA)"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default StockSearchBar;
