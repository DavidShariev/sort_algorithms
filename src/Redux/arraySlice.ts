import { TArrayEl, IState } from './types';
import { createSlice } from "@reduxjs/toolkit";

const makeShuffle = (array: TArrayEl[]) => {
  array = [...array];
  let m = array.length, swap, i;

  while(m){
    i = Math.floor(Math.random() * m--);
    swap = array[m];
    array[m] = array[i];
    array[i] = swap;
  }

  return array;
}
const createArray = () => {
    let imageList: TArrayEl[] = [];

    for (let i = 1; i < 401; i++) {
        let imagePartNumber = "" + i;
        imagePartNumber.length === 1 && (imagePartNumber = "00" + i);
        imagePartNumber.length === 2 && (imagePartNumber = "0" + i);

        imageList.push({
            image: require(`../images/image_part_${imagePartNumber}.jpg`),
            id: i,
        });
    }

    imageList = makeShuffle(imageList);
    return imageList;
};

const initialState: IState = {
  status: "waiting",
  array: createArray()
}

const arraySlice = createSlice({
  name: "array",
  initialState,
  reducers: {
    "startSorting": (state) => {
      state.status = "sorting";
    },
    "setArray": (state, action) => {
      state.array = action.payload
    },
    "shuffle": (state) => {
      state.array = makeShuffle([...state.array]);
      state.status = "waiting";
    },
    "stop": (state) => {
      state.status = "waiting";
    },
    "sorted": (state) => {
      state.status = "sorted"
    }
  }
})

export const { startSorting, setArray, shuffle, stop, sorted } = arraySlice.actions;
export default arraySlice.reducer;