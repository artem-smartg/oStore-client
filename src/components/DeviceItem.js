import React from "react";
import { Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";


const DeviceItem = ({device}) => {

    const navigate = useNavigate();

    return (
        <Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width:150, cursor:'poiner'}} border={"light"} className="mb-3">
                <Image width={150} height={150} src={device.img}/>
                
                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    <div>{device.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <div>&#9733;</div>
                    </div>
                </div>    
                
                <div>{device.name}</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;