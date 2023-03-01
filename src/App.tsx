import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import BubbleSorting from "./Pages/BubbleSorting/BubbleSorting";
import DivisionSorting from "./Pages/DivisionSorting/DivisionSorting";
import HeapSorting from "./Pages/HeapSorting/HeapSorting";
import InsertionSorting from "./Pages/InsertionSorting/InsertionSorting";
import QuickSorting from "./Pages/QuickSorting/QuickSorting";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<BubbleSorting />}></Route>
                    <Route
                        path="/division"
                        element={<DivisionSorting />}
                    ></Route>
                    <Route path="/heap" element={<HeapSorting />}></Route>
                    <Route
                        path="/insertion"
                        element={<InsertionSorting />}
                    ></Route>
                    <Route path="/quick" element={<QuickSorting />}></Route>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
