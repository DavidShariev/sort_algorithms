import React, { useEffect, useRef } from "react";
import ControlBox from "../../Components/ControlBox";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { TArrayEl } from "../../Redux/types";

const DivisionSorting = () => {
    const state = useAppSelector((state) => state.main);
    const frames = useRef<TArrayEl[][]>([]);

    useEffect(() => {
        if (state.status !== "sorting") {
            if (state.status === "waiting" && frames.current.length === 0) {
                divisionSortFunction(state.array, []);
            }
            if (state.status === "waiting" && frames.current.length !== 0) {
                frames.current = [];
                divisionSortFunction(state.array, []);
            }
        }
    });

    const merge = (left: TArrayEl[], right: TArrayEl[]) => {
        let arr: TArrayEl[] = [];
        while (left.length && right.length) {
            if (left[0].id < right[0].id) {
                arr.push(left.shift() as TArrayEl);
            } else {
                arr.push(right.shift() as TArrayEl);
            }
        }

        return [...arr, ...left, ...right];
    };

    const divisionSortFunction = (
        arr: TArrayEl[],
        otherPart: TArrayEl[]
    ): TArrayEl[] => {
        arr = [...arr];
        const half = arr.length / 2;

        if (arr.length < 2) {
            return arr;
        }

        const left = arr.splice(0, half);

        const result: TArrayEl[] = merge(
            divisionSortFunction(left, [...otherPart, ...arr]),
            divisionSortFunction(arr, [...otherPart, ...left])
        ) as TArrayEl[];

        frames.current.push([...result, ...otherPart]);
        console.log(frames.current.length);
        return [...result];
    };

    return (
        <div>
            <ControlBox frames={frames.current} />
        </div>
    );
};

export default DivisionSorting;
