
import React, { useContext } from "react";
import { Context } from "..";
import ListGroup from 'react-bootstrap/ListGroup';
import { observer } from "mobx-react-lite";
import { ListGroupItem } from "react-bootstrap";

const TypeBar = observer(() => {

    const { device } = useContext(Context)


    return (
        <ListGroup style={{ width: 200 }}>
            {device.types.map(type =>
                <ListGroupItem
                    style={{ cursor: 'pointer' }}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroupItem>
            )}
        </ListGroup>
    );
})

export default TypeBar;