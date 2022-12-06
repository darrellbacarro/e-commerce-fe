import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import './details.css';
import Carousel from 'react-material-ui-carousel';

interface ImagesProps {
    images: string[];
}
export function Images({ images }: ImagesProps) {
    const [selectedImage, setSelectedImage] = useState("");
    useEffect(() => {
        setSelectedImage(images[0]);
    }, [images]);
    return (
        <Grid container className="img-container">
            <Grid item md={2} display={{ md: "block", xs: "none" }}>
                {images.length && images.map((image, i) =>
                    <Grid item key={i} onMouseEnter={() => { setSelectedImage(image); }}>
                        <img className={"img-mini " + (selectedImage === image ? "img-mini-selected" : '')} alt={image} src={image} />
                    </Grid>
                )}
            </Grid>
            <Grid item display={{ md: "block", xs: "none" }} md={10} className="fixed-size">
                <img className="img" alt={selectedImage} src={selectedImage} />
            </Grid>
            <Grid item display={{ md: "none" }} xs={12} className="fixed-size">
                <Carousel autoPlay={false} animation={"slide"} cycleNavigation={false}>
                    {
                        images.length && images.map((image, i) =>
                            <Paper key={i}>
                                <img className="img" alt={image} src={image} />
                            </Paper>
                        )
                    }
                </Carousel>
            </Grid>
        </Grid>
    );
}