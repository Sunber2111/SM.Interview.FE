// React
import React, { useCallback, useEffect, useState } from 'react';

// 3th party
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';

// app
import { NumberListContainerWrapper } from './styles';
import { showError } from 'app/notification';
import sortArrayService from 'features/sort-array/services/sort-array.service';
import { MIN_VALUE_NUMBER } from 'features/sort-array/constants';
import NumberRow from 'features/sort-array/components/number-row';

const NumberListContainer = () => {
  const [listOfNumber, setListOfNumber] = useState<number[]>([]);
  const [listOfNumberSorted, setListOfNumberSorted] = useState<number[]>([]);
  const [numberInput, setNumberInput] = useState<number>(0);

  useEffect(() => {
    setListOfNumber(randomNumber(MIN_VALUE_NUMBER));
  }, []);

  const handleRandom = useCallback(() => {
    setListOfNumber(randomNumber(MIN_VALUE_NUMBER));
  }, []);

  const handleSort = async () => {
    if (listOfNumber.length < MIN_VALUE_NUMBER) {
      showError(`Min items must be more than or queal ${MIN_VALUE_NUMBER}`);
      return;
    }
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
    const cloneArray = [...listOfNumber];
    cloneArray.unshift(numberInput);
    setListOfNumber(cloneArray);
  };

  const handleClear = () => {
    setListOfNumber([]);
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
            onChange={(e) => {
              setNumberInput(parseInt(e.target.value));
            }}
          />
          <Button variant="outlined" onClick={handleAddToList}>
            Add into list
          </Button>
          <Button variant="outlined" onClick={handleSort}>
            Sort
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outlined" onClick={handleRandom}>
            Random {MIN_VALUE_NUMBER} number
          </Button>
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
