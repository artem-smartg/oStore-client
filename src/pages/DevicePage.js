
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
    
    const [device, setDevice] = useState({info:[]})

    const {id} = useParams()

    useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    
    return(
        <Container className="mt-3">
             <div className="d-flex justify-content-between align-items-center p-3">
                <div md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </div>

                <div md={4}>
                    <div>
                        <h2 style={{textAlign:'center'}}>{device.name}</h2>
                        <div className="d-flex justify-content-center">
                            {device.rating}&#9733;
                        </div>
                    </div>
                </div>

                <div md={4}>
                    <Card  
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width:300, height:300, fontSize: 32, border:'5px solid #ccc'}}
                    >
                        <h3>{device.price}</h3>
                        <Button>Add Basket</Button>
                    </Card>
                </div>
            </div>
            <div className="d-flex flex-column m-3">
                <h1>Description:</h1>
                {device.info.map((info, index) => 
                    <div key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </div>
                    )}
            </div>

        </Container>
    );
}

export default DevicePage;