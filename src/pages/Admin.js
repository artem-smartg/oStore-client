
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import CreateBook from "../components/modal/CreateBook";
import CreateBrand from "../components/modal/CreateBrand";
import CreateDevice from "../components/modal/CreateDevice";
import CreateNews from "../components/modal/CreateNews";
import CreateType from "../components/modal/CreateType";

const Admin = () => {

    const [bookVisible, setBookVisible] = useState(false)
    const [newsVisible, setNewsVisible] = useState(false)

    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviseVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)

    return(
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"}
                className="mt-2 p-4"
                onClick={() => setBookVisible(true)}
            >Добавить книгу
            </Button>
            <Button 
                variant={"outline-dark"}
                className="mt-2 p-4"
                onClick={() => setNewsVisible(true)}
            >Добавить новость
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <Button 
                variant={"outline-dark"}
                className="mt-2 p-4"
                onClick={() => setBrandVisible(true)}
            >Добавить brand
            </Button>
            <Button 
                variant={"outline-dark"}
                className="mt-2 p-4"
                onClick={() => setDeviseVisible(true)}
            >Добавить device
            </Button>
            <Button 
                variant={"outline-dark"}
                className="mt-2 p-4"
                onClick={() => setTypeVisible(true)}
            >Добавить type
            </Button>

            <CreateBook show={bookVisible} onHide={() => setBookVisible(false)}/>
            <CreateNews show={newsVisible} onHide={() => setNewsVisible(false)}/>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviseVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>

    );
}

export default Admin;