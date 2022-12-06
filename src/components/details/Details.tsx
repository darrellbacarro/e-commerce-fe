import { Collapse, Divider, Grid, Typography } from "@mui/material";
import { IProduct } from "../../redux/types";
import { currencyFormatter } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface DetailsProps {
    details: IProduct;
}
export function Details({ details }: DetailsProps) {
    const productDetails = details.details;
    const [openDescription, setOpenDescription] = useState(true);
    const [openRatings, setOpenRatings] = useState(false);
    return (
        <Grid container>
            <Grid container display={{ md: "none", xs: "block" }}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" component="h5">
                        {details.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{ background: 'grey' }} />
                </Grid>
                <Grid container item xs={12} sm={12} py={1}>
                    <Grid item xs={6} className="gold">
                        {[...Array(5)].map((_, i) => {
                            return <FontAwesomeIcon icon={faStar} key={i} />;
                        })}
                        <span> 4.7</span>
                    </Grid>
                    <Grid item xs={6} className="text-right">
                        <span className="a-price">{currencyFormatter.format(details.amount)}</span>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} pt={3}>
                <Grid item xs={6}>
                    <span className="content-title">Description</span>
                </Grid>
                <Grid item xs={6} className="text-right">
                    <FontAwesomeIcon
                        onClick={() => setOpenDescription(!openDescription)}
                        icon={(openDescription ? faChevronDown : faChevronRight)} />
                </Grid>
                <Grid item xs={12} py={1}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={openDescription} timeout="auto" unmountOnExit>
                        <div className="content-body">{productDetails}</div>
                    </Collapse>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} pt={3}>
                <Grid item xs={6}>
                    <span className="content-title">Ratings</span>
                </Grid>
                <Grid item xs={6} className="text-right">
                    <FontAwesomeIcon
                        onClick={() => setOpenRatings(!openRatings)}
                        icon={(openRatings ? faChevronDown : faChevronRight)} />
                </Grid>
                <Grid item xs={12} py={1}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={openRatings} timeout="auto" unmountOnExit>
                    </Collapse>
                </Grid>
            </Grid>
        </Grid>
    );
}