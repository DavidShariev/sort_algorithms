import React, { useEffect, useRef } from "react";
import ControlBox from "../../Components/ControlBox";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { TArrayEl } from "../../Redux/types";

const QuickSorting = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.main);
    const frames = useRef<TArrayEl[][]>([]);

    useEffect(() => {
        if (state.status !== "sorting") {
            if (state.status === "waiting" && frames.current.length === 0) {
                quickSortAlgorithm(state.array, []);
            }
            if (state.status === "waiting" && frames.current.length !== 0) {
                frames.current = [];
                quickSortAlgorithm(state.array, []);
            }
        }
    });

    const quickSortAlgorithm = (
        arr: TArrayEl[],
        otherPart: TArrayEl[]
    ): TArrayEl[] => {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[arr.length - 1];
        const leftList = [];
        const rightList = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].id < pivot.id) {
                leftList.push(arr[i]);
            } else {
                rightList.push(arr[i]);
            }
        }

        const result: TArrayEl[] = [
            ...quickSortAlgorithm(leftList, [
                ...rightList,
                ...otherPart,
                pivot,
            ]),
            pivot,
            ...quickSortAlgorithm(rightList, [
                ...leftList,
                ...otherPart,
                pivot,
            ]),
        ];

        frames.current.push([...result, ...otherPart]);
        return result;
    };

    return (
        <div>
            <ControlBox frames={frames.current} />
        </div>
    );
};

export default QuickSorting;
