import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { setArray, shuffle, startSorting, stop } from "../Redux/arraySlice";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { TArrayEl } from "../Redux/types";

interface IProps {
    frames: TArrayEl[][];
}
const ControlBox = ({ frames }: IProps) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.main);

    const playFrames = () => {
        if (frames.length > 0) {
            setTimeout(() => {
                console.log(frames.length);
                dispatch(setArray(frames.shift()));
            }, 10);
        } else {
            dispatch(stop());
        }
    };

    useEffect(() => {
        if (state.status === "sorting") {
            playFrames();
        }
    });

    return (
        <Box>
            <HStack justifyContent={"space-between"} mb="20px">
                <Box>
                    <Button
                        colorScheme={"blue"}
                        opacity={state.status === "sorting" ? "0.5" : "1"}
                        onClick={() => {
                            if (state.status !== "sorting") {
                                dispatch(startSorting());
                            }
                        }}
                    >
                        Сортировать
                    </Button>
                    <Button
                        ml={"2rem"}
                        colorScheme={"orange"}
                        opacity={state.status === "sorting" ? "0.5" : "1"}
                        onClick={() => {
                            if (state.status !== "sorting") {
                                dispatch(shuffle());
                            }
                        }}
                    >
                        Перемешать
                    </Button>
                </Box>

                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text
                        display="inline-block"
                        mr="1rem"
                        fontSize="1.2rem"
                        fontWeight="600"
                        lineHeight={"100%"}
                        height="100%"
                    >
                        Фреймов осталость:
                        {" " + frames.length}
                    </Text>
                    <Button
                        colorScheme={"red"}
                        onClick={() => {
                            dispatch(stop());
                        }}
                    >
                        Стоп
                    </Button>
                </Box>
            </HStack>
        </Box>
    );
};

export default ControlBox;
