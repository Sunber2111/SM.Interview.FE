import React, { useCallback, useEffect, useState } from 'react';
import { NumberListContainerWrapper } from './styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import NumberRow from 'features/sort-array/components/number-row';
import sortArrayService from 'features/sort-array/services/sort-array.service';
import { showError } from 'app/notification';

const NumberListContainer = () => {
  const [listOfNumber, setListOfNumber] = useState<number[]>([]);
  const [listOfNumberSorted, setListOfNumberSorted] = useState<number[]>([]);
  const [numberInput, setNumberInput] = useState<number>(0);

  useEffect(() => {
    setListOfNumber(randomNumber(50));
  }, []);

  const handleRandom = useCallback(() => {
    setListOfNumber(randomNumber(50));
  }, []);

  const handleSort = async () => {
    try {
      const res = await sortArrayService.sortAnArray({
        ListOfNumbers: listOfNumber,
      });
      setListOfNumberSorted(res.data);
    } catch (error: any) {
      showError(error.message);
    }
  };

  const handleAddToList = () => {
    setListOfNumber([...listOfNumber, numberInput]);
  };

  return (
    <NumberListContainerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Paper className="wrap-numbers-col">
            {listOfNumber.map((value, index) => (
              <NumberRow value={value} key={index} />
            ))}
          </Paper>
        </Grid>
        <Grid className="wrap-btns" item xs={2}>
          <TextField
            type="number"
            label="Outlined"
            variant="outlined"
            value={numberInput}
            onChange={(e) => setNumberInput(parseInt(e.target.value))}
          />
          <Button onClick={handleAddToList}>Add into list</Button>
          <Button onClick={handleSort}>Sort</Button>
          <Button onClick={handleRandom}>Random 50 number</Button>
        </Grid>
        <Grid item xs={5}>
          <Paper className="wrap-numbers-col">
            {listOfNumberSorted.map((value, index) => (
              <NumberRow value={value} key={index} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </NumberListContainerWrapper>
  );
};

const randomNumber = (time: number) => {
  const output = [];
  for (let index = 0; index < time; index++) {
    output.push(Math.floor(Math.random() * 1000));
  }
  return output;
};

export default NumberListContainer;
