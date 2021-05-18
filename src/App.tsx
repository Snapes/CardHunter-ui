import React, { useState, useEffect } from 'react';
import {Container, TextField, Typography, Box} from '@material-ui/core';
import { Autocomplete} from '@material-ui/lab';
import MUIDataTable from "mui-datatables";
import axios from "axios"

const options = {
  filterType: 'checkbox',
};

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
]

export default function App() {

  // const [columns, setColumns] = useState([])
  // useEffect(() => {
  //   axios.get('http://localhost:5000/parsers').then(res => setColumns(res.data))
  //   .catch(err => console.log(err.message))
  // }, [])

  const [scryfall, scryComplete] = useState([])
  const scry_api_get = (value) => {    
    axios.get(`https://api.scryfall.com/cards/autocomplete?q=${value.target.value}`).then(res => scryComplete(res.data["data"]))
    .catch(err => console.log(err.message))
  }


  const [data, setData] = useState(Array());

  const select_card = (value) => {
    axios.post('http://localhost:5000/card', {
      card: value.target.innerText,
    }).then(res => setData([...data, res.data]))
    .catch(err => console.log(err.message))
    console.log(data)
  }

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          MTG Card Hunter
        </Typography>
        <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={scryfall}
        onClose={select_card}
        renderInput={(params) => (
          <TextField {...params} label="Add Card" margin="normal" onChange={scry_api_get} variant="outlined" />
        )}
      />
        <MUIDataTable title={"Prices"} data={data} columns={columns} options={options}/>
      </Box>
    </Container>
  );
}

// export default AppTable