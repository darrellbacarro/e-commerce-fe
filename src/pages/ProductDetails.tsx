import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Images, Details } from "../components/details";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductDetails } from "../redux/slices/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { currencyFormatter } from "../utils";

export function ProductDetails() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const productDetails = useAppSelector((state) => state.products.details);
    const { status } = useAppSelector(({ products }) => products);

    useEffect(() => {
        id && dispatch(getProductDetails(id));
    }, [id, dispatch]);

    return (
        <React.Fragment>
            <Container fixed>
                <Box>
                    {status === 'idle' && <Grid container spacing={2} px={1}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Images images={productDetails.images} />
                            <Details details={productDetails} />
                        </Grid>
                        <Grid item display={{ md: "block", xs: "none" }} md={6}>
                            <Grid item className="sticky-container">
                                <Typography variant="h5" component="h5">
                                    {productDetails.name}
                                </Typography>
                                <Divider />
                                <Grid container item xs={12} sm={12} py={1}>
                                    <Grid item xs={6} className="gold">
                                        {[...Array(5)].map((_, i) => {
                                            return <FontAwesomeIcon icon={faStar} key={i} />;
                                        })}
                                        <span> 4.7</span>
                                    </Grid>
                                    <Grid item xs={6} className="text-right">
                                        <span className="a-price">{currencyFormatter.format(productDetails.amount)}</span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>}
                </Box>
            </Container>
        </React.Fragment>
    );
}