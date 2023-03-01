import { Box } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../Redux/store";
import Map from "../Components/Map";

const MainLayout = () => {
    const state = useAppSelector((state) => state.main);

    return (
        <Box>
            <Sidebar />
            <Box ml={{ base: 0, md: 80 }} p="4">
                <Outlet />
                <Map arr={state.array}></Map>
            </Box>
        </Box>
    );
};

export default MainLayout;
