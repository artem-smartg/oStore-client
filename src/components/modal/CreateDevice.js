
import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import axios from "axios";

const CreateDevice = observer(({ show, onHide }) => {

    const { device } = useContext(Context);
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    // const [upload, setUpload] = useState()

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const deleteInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = async (e) => {
        const dropFile = e.target.files[0]

        await axios.post(process.env.REACT_APP_API_URL + "api/upload", { "file": dropFile }, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((json) => {
            setFile('http://localhost:5000' + json.data.url)
        })

    }

    const addDevice = async (e) => {
        try {
            console.log(file)
            const formData = new FormData();

            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('brandId', device.selectedBrand.id)
            formData.append('typeId', device.selectedType.id)
            formData.append('info', JSON.stringify(info))

            const data = {
                "name": name,
                "price": `${price}`,
                "img": file,
                "brandId": device.selectedBrand.id,
                "typeId": device.selectedType.id,
                "info": JSON.stringify(info)
            }

            if (!file) {
                alert("Select a file")
                return
            }
            createDevice(data).then(data => onHide())
        }
        catch (err) {
            console.log(err)
        }
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
                    Add new book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2">
                        <DropdownToggle>{device.selectedType.name || 'Выберите тип'}</DropdownToggle>
                        <DropdownMenu>
                            {device.types.map(type =>
                                <DropdownItem
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown className="mt-2">
                        <DropdownToggle>{device.selectedBrand.name || "Выберите бренд"}</DropdownToggle>
                        <DropdownMenu>
                            {device.brands.map(brand =>
                                <DropdownItem
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder="название книги"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="стоимость книги"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        type="number"
                    />
                    <Form.Control
                        type="file"
                        className="mt-3"  //filefilefilefilefilefilefilefilefilefile
                        onChange={selectFile}
                    />
                    <Button
                        className="mt-2"
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-2" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={'outline-danger'}
                                    onClick={() => deleteInfo(i.number)}
                                >Delete</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;







