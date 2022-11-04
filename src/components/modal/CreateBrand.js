
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { createBrand } from "../../http/deviceAPI";

const CreateBrand = ({show, onHide}) => {

    const [value, setValue] = useState('')
    
    const addBrand = () => {
        createBrand({name: value}).then(data=> {
            setValue('')
            onHide()
        })
    }   

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        placeholder={"title brand"}
                        className='mt-2'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    {/* <Form.Control 
                        placeholder={"description brand"}
                        className='mt-2'
                    /> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateBrand;







