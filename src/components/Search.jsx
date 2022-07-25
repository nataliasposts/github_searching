import React, { useState} from 'react';
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({
  form: {
    marginBottom: "100px",
  },
});


const Search = ({onSearch})=> {
    const [searchValue, setSearchValue] = useState("");
    const classes = useStyles();
    
    function onSubmit(e) {
        e.preventDefault();
        onSearch(searchValue);
      }
    
      return (
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                defaultValue="Find github repo"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined/>
                    </IconButton>
                  ),
                }}
              />
        </form>
      );
}

export default Search;