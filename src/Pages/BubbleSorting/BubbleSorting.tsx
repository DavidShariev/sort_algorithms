import { Box, Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import ControlBox from "../../Components/ControlBox";
import Map from "../../Components/Map";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { TArrayEl } from "../../Redux/types";
import lodash from "lodash";

const BubbleSorting = () => {
    const state = useAppSelector((state) => state.main);
    const frames = useRef<TArrayEl[][]>([]);

    useEffect(() => {
        if (state.status !== "sorting") {
            if (state.status === "waiting" && frames.current.length === 0) {
                BubbleSortFunction(state.array);
            }
            if (state.status === "waiting" && frames.current.length !== 0) {
                frames.current = [];
                BubbleSortFunction(state.array);
            }
        }
    });

    const BubbleSortFunction = (array: TArrayEl[]) => {
        array = [...array];
        for (let i = 0; i < array.length; i++) {
            let changed = false;
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j].id > array[j + 1].id) {
                    const swap = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = swap;
                    changed = true;
                }
            }

            if (changed) {
                frames.current.push([...array]);
            }
        }
    };

    return (
        <Box>
            <ControlBox frames={frames.current} />
        </Box>
    );
};

export default BubbleSorting;
