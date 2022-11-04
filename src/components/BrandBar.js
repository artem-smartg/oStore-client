
import React, { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {

    const { device } = useContext(Context)


    return (
        <Row 
            className="d-flex"
            style={{flexWrap: 'nowrap', width: 100}}
        >
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className="p-2"
                    style={{textAlign: 'center', marginRight: 5, cursor:'pointer'}}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>   
            )}
        </Row>
    );
})

export default BrandBar;