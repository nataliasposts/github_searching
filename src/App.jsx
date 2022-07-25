import React, { useState } from 'react';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Container, CssBaseline, Switch } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import Search from './components/Search';
import Repos from './components/Repos';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  section: {
    padding: "125px 0 137px 0"
  },
});


const App = () => {

  const [mode, setMode] = useState("light");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      background: {
        default: "hsl(230, 17%, 14%)"
      }
    }
  });

  const lightTheme = createTheme({
    palette: {
      type: "light",
      background: {
        default: "hsl(0, 0%, 100%)"
      }
    }
  });

  const selectedTheme = mode === "dark" ? darkTheme : lightTheme;


  async function fetchRepos(org) {
    setIsLoading(true);
    let result = [];
    try {
      result = (await axios.get(`https://api.github.com/orgs/${org}/repos`)).data;
    } catch(e) {
      setError("Sorry, something went wrong")
    }
    setRepos(result);
    setIsLoading(false);
  }
    


  if (error) {
    return <Typography variant='h4'>{error}</Typography>
  }


  return(
    <ThemeProvider theme={selectedTheme}>
        <CssBaseline/>
        <div className={classes.section}>
            <Container maxWidth="lg">
                <Typography align="center" variant="h3">
                    Find repositories 
                </Typography>
                <Switch onChange={() => setMode(mode === "light" ? "dark" : "light")} />
                <Search onSearch={fetchRepos}/>
                {isLoading ?( <Typography variant='h5'>Loading..</Typography>) :(<Repos repos={repos}/>) } 
            </Container>
        </div>
    </ThemeProvider>
  )
}
     
      
export default App;