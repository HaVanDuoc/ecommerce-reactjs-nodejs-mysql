import { selectorProducts } from "~/redux/productSlice"
import { Box, Container, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { requestCategories } from "~/api"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import Slider from "react-slick"

const Nav = () => {
    const nav = useSelector(selectorProducts)?.categories
    const dispatch = useDispatch()

    useEffect(() => {
        if (!nav.length) requestCategories(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Styled>
            <Container maxWidth="lg" disableGutters>
                <Box sx={style1}>
                    <Slider dots={false} infinite={false} speed={500} slidesToShow={8} slidesToScroll={8}>
                        {nav.length &&
                            nav.map((item, index) => {
                                return (
                                    <Box key={index} sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                        <Link
                                            to={`/${item.alias}`}
                                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        >
                                            <Typography
                                                display="flex"
                                                flexWrap="wrap"
                                                color="#fff"
                                                textTransform="uppercase"
                                                fontWeight={500}
                                                justifyContent="center"
                                            >
                                                {item.categoryName}
                                            </Typography>
                                        </Link>
                                    </Box>
                                )
                            })}
                    </Slider>
                </Box>
            </Container>
        </Styled>
    )
}

export default Nav

const style1 = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50px",
}

const Styled = styled(Box)(() => ({
    backgroundColor: "var(--color-main)",
    boxShadow: "2px 0 5px 5px rgba(0, 0, 0, 0.05)",

    ".slick-slider": {
        width: "100%",

        ":hover": {
            button: {
                opacity: 1,
            },
        },
    },

    ".slick-slider button": {
        width: "20px",
        height: "20px",
        color: "#fff",
        opacity: 0,
        transition: "all .3s ease-in-out",
    },

    "button.slick-prev:before, button.slick-next:before": {
        fontSize: "20px",
    },

    ".slick-prev.slick-disabled:before, .slick-next.slick-disabled:before": {
        opacity: 0,
    },
}))