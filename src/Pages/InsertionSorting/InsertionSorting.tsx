import React, { useEffect, useRef } from "react";
import ControlBox from "../../Components/ControlBox";
import Map from "../../Components/Map";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { TArrayEl } from "../../Redux/types";

const InsertionSorting = () => {
    const state = useAppSelector((state) => state.main);
    const frames = useRef<TArrayEl[][]>([]);

    useEffect(() => {
        if (state.status !== "sorting") {
            if (state.status === "waiting" && frames.current.length === 0) {
                insertionSortFunction(state.array);
            }
            if (state.status === "waiting" && frames.current.length !== 0) {
                frames.current = [];
                insertionSortFunction(state.array);
            }
        }
    });

    const insertionSortFunction = (arr: TArrayEl[]) => {
        arr = [...arr];
        for (let i = 1, l = arr.length; i < l; i++) {
            const current = arr[i];
            let j = i;
            while (j > 0 && arr[j - 1].id > current.id) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = current;
            frames.current.push([...arr]);
        }
    };

    return (
        <div>
            <ControlBox frames={frames.current} />
        </div>
    );
};

export default InsertionSorting;
