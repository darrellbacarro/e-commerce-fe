import { IProduct } from "../../redux/types";
import './product.css';
import { currencyFormatter } from '../../utils';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ProductProps {
    product: IProduct
}

export function Product({ product }: ProductProps) {
    return (
        <Link className="product-link" to={`/product/${product.id}`}>
            <div className="product-container">
                {product.images &&
                    <div className="img-container">
                        <img className="img" alt={product.name} src={product.images[0]} />
                    </div>
                }
                <span className="product-title">{product.name}</span>
                <Grid container>
                    <Grid item xs={6}>
                        <span className="product-subtitle">{currencyFormatter.format(product.amount)}</span>
                    </Grid>
                    <Grid item xs={6} className="gold text-right">
                        <FontAwesomeIcon icon={faStar} />
                        <span>4.7</span>
                    </Grid>
                </Grid>
            </div>
        </Link>
    );
}