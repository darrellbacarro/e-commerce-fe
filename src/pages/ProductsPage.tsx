import React from "react";
import { Grid } from "@mui/material";
import ProductsList from "../components/product/ProductsList";
import { Box, Container } from "@mui/system";
export function ProductPage() {
    return (
        <React.Fragment>
            <Container fixed>
                <Box>
                    <Grid container spacing={2} px={1}>
                        <Grid item xs={12}>
                            <ProductsList />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}
