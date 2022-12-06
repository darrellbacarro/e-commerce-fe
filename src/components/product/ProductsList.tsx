import { useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
import { Product } from './Product';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProducts } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

export default function ProductsList() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(({ products }) => products.data.list);
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div className="category-title">
                        Best Sellers
                    </div>
                </Grid>
                <Grid item xs={4} className="text-right">
                    <Link to="#" className="link product-subtitle">
                        Shop More
                    </Link>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
                {products && products.map((product, i) => {
                    return (<Grid item xs={6} sm={2} key={i}>
                        <Product product={product} key={i} />
                    </Grid>);
                })}
            </Grid>
        </div>

    );
}
