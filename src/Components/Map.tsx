import React, { memo } from "react";
import { TArrayEl } from "../Redux/types";
import lodash from "lodash";
import { Box, Grid, Image } from "@chakra-ui/react";

interface IProps {
    arr: TArrayEl[];
}

const Map = React.memo(
    ({ arr }: IProps) => {
        return (
            <Box mx={"auto"}>
                <Grid w={"100%"} templateColumns="repeat(20, 1fr)">
                    {arr?.map((el) => {
                        return (
                            <Image
                                w="100%"
                                h="100%"
                                src={"" + el.image}
                                key={el.id}
                            ></Image>
                        );
                    })}
                </Grid>
            </Box>
        );
    },
    (prevProps: IProps, nextProps: IProps) => {
        return lodash.isEqual(prevProps.arr, nextProps.arr);
    }
);

export default Map;
