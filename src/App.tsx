import React, { useState, useEffect } from 'react';
import {Container, TextField, Typography, Box} from '@material-ui/core';
import { Autocomplete} from '@material-ui/lab';
// import { DataGrid } from '@material-ui/data-grid';
import MUIDataTable from "mui-datatables";
import axios from "axios"
import { GridNoRowsOverlay } from '@material-ui/data-grid';

const columns = [
    "Card",
    "Hobbymaster",
    "Hareruya EN",
    "Hareruya JP",
    "Baydragon",
    "Goblin Games",
    "Spellbound",
    "Magic at Willis",
    "Iron Knight Gaming",
    "Magic Magpie"
];

const rows = [
  ['Fervor', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  ['Counterspell', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
];

const options = {
  filterType: 'checkbox',
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
]


export default function App() {

  const [columns, setColumns] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/parsers').then(res => setColumns(res.data))
    .catch(err => console.log(err.message))
  }, [])

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:5000/cards', {
      cards: ['Fervor'],
    }).then(res => setData(res.data))
    .catch(err => console.log(err.message))
  }, [])


  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          MTG Card Hunter
        </Typography>
        <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
        )}
      />
        <MUIDataTable title={"Prices"} data={data} columns={columns} options={options}/>
      </Box>
    </Container>
  );
}

// export default AppTable