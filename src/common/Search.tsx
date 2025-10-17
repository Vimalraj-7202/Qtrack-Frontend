import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import Search from "@/assets/search.svg";

interface CommonFilterProps {
  query: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CommonSearch = ({
  query,
  onChange,
  placeholder = "Search..."}: CommonFilterProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {onChange(e.target.value)};

  return (
    <Box sx={{display:'flex',justifyContent:'flex-end'}}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        sx={{
          width: 250,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            height: 40,
            "& fieldset": {
              borderColor: "#868686",
            },
            "&:hover fieldset": {
              borderColor: "#868686",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#868686",
              boxShadow: "none",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "0 14px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="img"
                src={Search}
                alt="Search"
                sx={{
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CommonSearch;
