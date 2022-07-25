import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



const useStyles = makeStyles({
  tablecontainer: {
    marginBottom: "40px",
  },
  button:{
    margin: "auto",
    background: "#447EEB",
    boxShadow: "0px 4px 9px rgba(82, 95, 129, 0.35)",
    borderRadius: "30px",
    color: "white"
  },
  row: {
    display: "flex",
    flexDirection: "column",
  }
});



const Repos = ({ repos})=> {
 const repoPerRow = 4;
 const [noOfElement, setNoOfElement] = useState(repoPerRow);
 const classes = useStyles();
 

 
 const loadMore = ()=>{
   setNoOfElement(noOfElement + repoPerRow);
 }
  


  return (
  <div className={classes.row}>
      <TableContainer component={Paper} className={classes.tablecontainer}>
          <Table aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <StyledTableCell width="34%">
                          Name
                      </StyledTableCell>
                      <StyledTableCell align="left" width="34%">
                          Description
                      </StyledTableCell>
                      <StyledTableCell align="right" width="32%">
                          Stars
                      </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tablebobody}>
                    {repos.slice(0, noOfElement).map(org => ( 
                <TableRow  key={org.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                        <a href={org.html_url} target="_blank">
                            {org.name}
                        </a>
                    </TableCell>
                    <TableCell align="left">
                        {org.description}
                    </TableCell>
                    <TableCell align="right">
                        {org.watchers_count}
                    </TableCell>
               </TableRow>
        ))}
               </TableBody>
          </Table>
       </TableContainer>
       {noOfElement < repos.length && (
       <Button variant="contained" onClick={()=> loadMore()} className={classes.button}>load more</Button>
       )}
</div>

  );

}

export default Repos;