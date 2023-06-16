import { useParams } from "react-router-dom"
import { AdminTitle } from "~/admin/Styled"
import React, { Fragment, useEffect, useState } from "react"
import axiosInstance from "~/api"
import InfoCustomer from "./components/InfoCustomer"
import InfoContact from "./components/InfoContact"
import Contact from "./components/Contact"
import LineInfoOrder from "./components/LineInfoOrder"
import LineTitle from "./components/LineTitle"
import SectionProducts from "./components/SectionProducts"
import LineSumPayment from "./components/LineSumPayment"
import { Box, Container, Stack } from "@mui/material"
import styled from "@emotion/styled"

const OrderDetails = () => {
    const [orders, setOrders] = useState([])
    const [payment, setPayment] = useState(0) // số tiền thanh toán
    const [reset, setReset] = useState(true) // số sản phẩm đã chọn
    const codeOrder = useParams().codeOrder

    useEffect(() => {
        const getOrders = async () => {
            const response = await axiosInstance("post", "/order/getOrderDetails", { codeOrder })
            setOrders(response.data.data)
            setPayment(response.data.data.total)
        }

        getOrders()
    }, [codeOrder, reset])

    console.log('orders', orders)

    const order_id = orders?.order_id
    const firstName = orders?.firstName
    const middleName = orders?.middleName
    const lastName = orders?.lastName
    const dateOfBirth = orders?.dateOfBirth
    const gender = orders?.gender
    const address = orders?.address
    const phoneNumber = orders?.phoneNumber
    const email = orders?.email
    const avatar = orders?.avatar
    const order_code = orders?.order_code
    const createdAt = orders?.createdAt
    const order_status = orders?.order_status

    const order_list = orders?.order_list

    return (
        <Styled>
            <AdminTitle>Chi tiết hóa đơn</AdminTitle>

            <Information className="information">
                <InfoCustomer
                    firstName={firstName}
                    middleName={middleName}
                    lastName={lastName}
                    address={address}
                    dateOfBirth={dateOfBirth}
                    gender={gender}
                />

                <InfoContact phoneNumber={phoneNumber} email={email} />

                <Contact avatar={avatar} />
            </Information>

            <ListOrders>
                <Container maxWidth="lg" disableGutters>
                    <Fragment>
                        <Box sx={style1}>
                            <Option>
                                <LineInfoOrder
                                    createdAt={createdAt}
                                    order_code={order_code}
                                    order_status={order_status}
                                />

                                <LineTitle />

                                <SectionProducts
                                    order_list={order_list}
                                    order_status={order_status}
                                    payment={payment}
                                    setPayment={setPayment}
                                />

                                <LineSumPayment
                                    order_code={order_code}
                                    order_id={order_id}
                                    order_list={order_list}
                                    order_status={order_status}
                                    payment={payment}
                                    reset={reset}
                                    setReset={setReset}
                                />
                            </Option>
                        </Box>
                    </Fragment>
                </Container>
            </ListOrders>
        </Styled>
    )
}

export default OrderDetails

const Option = styled(Box)(() => ({
    boxShadow: "0 0px 1px 0px rgba(0,0,0.25)",
    borderRadius: "5px",

    ".col": {
        width: "100%",

        ".col-1": {
            width: "40%",
        },
        ".col-2": {
            width: "15%",
            textAlign: "center",
        },
        ".col-3": {
            width: "15%",
            textAlign: "center",
        },
        ".col-4": {
            width: "15%",
            textAlign: "center",
        },
        ".col-5": {
            width: "15%",
            textAlign: "center",
        },
    },

    ".title": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
        padding: "0 24px",
        borderBottom: "1px solid #ccc",
        boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.25);",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 3,

        p: {
            color: "#666",
        },
    },

    ".content": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        ".item": {
            padding: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
        },
    },
}))

const Styled = styled(Box)(() => ({
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
}))

const ListOrders = styled(Stack)(() => ({}))

const Information = styled(Stack)(() => ({
    flexDirection: "row",
    marginLeft: 24,
    marginRight: 24,

    ".section": {
        flex: 1,
        boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.15)",
        borderRadius: 15,
        padding: "10px 20px",
    },
}))

const style1 = {
    borderRadius: "5px",
    backgroundColor: "#fff",
    margin: "30px 24px",
}
