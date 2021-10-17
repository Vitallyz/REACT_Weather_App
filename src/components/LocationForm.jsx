import React from "react";
import { useState } from "react";

import { Button, Form, Row, Col } from "react-bootstrap";


export default function LocationForm({ handleLocationUpdate }) {

    const [validated, setValidated] = useState(false);

    const [errors, setErrors] = useState({
        nameIsValid: true,
        nameIsInvalid: false,
        latIsValid: true,
        latIsInvalid: false,
        longIsValid: true,
        longIsInvalid: false,
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        handleLocationUpdate(event);

    };

    function isNameValid(name) {
        if (name.length > 0 && name.length < 15) {

            return true
        }

        return false;
    }
    function isLatValid(lat) {
        if (lat >= -90 && lat <= 90) {
            setErrors(prevState => ({
                ...prevState,
                latIsValid: true,
            }))
            return true
        }

        return false;
    }
    function isLongValid(long) {
        if (long >= -180 && long <= 180) {
            setErrors(prevState => ({
                ...prevState,
                longIsValid: true,
            }))
            return true
        }

        return false;
    }


    function handleOnChangeName(e) {
        // console.log("On CHange Name event: ", e)
        if (isNameValid(e.target.value)) {
            setErrors(prevState => ({
                ...prevState,
                nameIsValid: true,
                nameIsInvalid: false,
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                nameIsValid: false,
                nameIsInvalid: true,
            }))

        }
    }

    function handleOnChangeLat(e) {
        // console.log("On CHange Name event: ", e)
        if (isLatValid(e.target.value)) {
            setErrors(prevState => ({
                ...prevState,
                latIsValid: true,
                latIsInvalid: false,
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                latIsValid: false,
                latIsInvalid: true,
            }))

        }
    }

    function handleOnChangeLong(e) {
        // console.log("On CHange Name event: ", e)
        if (isLongValid(e.target.value)) {
            setErrors(prevState => ({
                ...prevState,
                longIsValid: true,
                longIsInvalid: false,
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                longIsValid: false,
                longIsInvalid: true,
            }))

        }
    }

    function handleChange(e) {
        setValidated(false);

    }



    return (
        <Form noValidate validated={validated} onChange={handleChange} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control onChange={handleOnChangeName}
                        isValid={errors.nameIsValid}
                        isInvalid={errors.nameIsInvalid}
                        size="sm"
                        required
                        type="text"
                        placeholder="Location name"
                        defaultValue="Melbourne"
                    />
                    <Form.Control.Feedback type="invalid">Name should be 1 to 15 characters long</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control onChange={handleOnChangeLat}
                        isValid={errors.latIsValid}
                        isInvalid={errors.latIsInvalid}
                        size="sm"
                        required
                        type="text"
                        placeholder="Latitude"
                        defaultValue="-37.813999"
                    />
                    <Form.Control.Feedback type="invalid">Enter valid longitude</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Longitute</Form.Label>
                    <Form.Control onChange={handleOnChangeLong}
                        isValid={errors.longIsValid}
                        isInvalid={errors.longIsInvalid}
                        size="sm"
                        required
                        type="text"
                        placeholder="Longitute"
                        defaultValue="144.963318"
                    />
                    <Form.Control.Feedback type="invalid">Enter valid longitude</Form.Control.Feedback>
                </Form.Group>


            </Row>

            <Button size="sm" variant="info" type="submit" onSubmit={handleSubmit} disabled={!(errors.nameIsValid && errors.latIsValid && errors.longIsValid)}>Update Default Location</Button>
        </Form>
    );
}


