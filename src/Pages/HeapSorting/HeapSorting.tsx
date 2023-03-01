import React, { useEffect, useRef } from "react";
import ControlBox from "../../Components/ControlBox";
import Map from "../../Components/Map";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { TArrayEl } from "../../Redux/types";

const HeapSorting = () => {
    const state = useAppSelector((state) => state.main);
    const frames = useRef<TArrayEl[][]>([]);

    useEffect(() => {
        if (state.status !== "sorting") {
            if (state.status === "waiting" && frames.current.length === 0) {
                heapSortAlgorithm(state.array);
            }
            if (state.status === "waiting" && frames.current.length !== 0) {
                frames.current = [];
                heapSortAlgorithm(state.array);
            }
        }
    });

    function heapify(arr: TArrayEl[], n: number, i: number) {
        let largest = i,
            left = 2 * i + 1,
            right = 2 * i + 2;

        if (left < n && arr[i].id < arr[left].id) {
            largest = left;
        }
        if (right < n && arr[largest].id < arr[right].id) {
            largest = right;
        }
        if (largest != i) {
            let swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            arr = heapify(arr, n, largest);
        }
        return arr;
    }

    const heapSortAlgorithm = (array: TArrayEl[]) => {
        array = [...array];
        for (let i = array.length / 2 - 1; i >= 0; i--) {
            frames.current.push([...heapify(array, array.length, i)]);
        }
        for (let i = array.length - 1; i >= 0; i--) {
            let swap = array[0];
            array[0] = array[i];
            array[i] = swap;

            array = heapify(array, i, 0);
            frames.current.push([...array]);
        }
    };

    return (
        <div>
            <ControlBox frames={frames.current} />
        </div>
    );
};

export default HeapSorting;
