import React, { useState, useEffect, } from "react";
import {
    Button,
    Form,
    ButtonGroup,
    Col,
    Row,
    FloatingLabel
} from 'react-bootstrap';
import "./App.css";

export default function Pomodoro() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [breakTime, setBreakTime] = useState(5)
    const [start, setStart] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(false)


    function handleSubmit(event) {
        event.preventDefault();
        let session = event.target.elements.session.value;
        let breakTime = event.target.elements.break.value;

        if (!isNaN(session) && session >= 1) {
            setMinutes(session)
        }
        if (!isNaN(breakTime) && breakTime >= 1) {
            setBreakTime(breakTime)
        }
    }

    function handleReset() {
        setStart(false);
        setMinutes(25);
        setDisplayMessage(false);
        setTimeout(() => {
            setSeconds(0);
        }, 1005);
    }
    function handleStart() {
        setStart(true);
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (start) {
                clearInterval(interval)

                if (seconds === 0) {
                    if (minutes !== 0) {
                        setSeconds(59)
                        setMinutes(minutes - 1)
                    } else {
                        let minutes = displayMessage ? minutes - 1 : breakTime - 1
                        let seconds = 59

                        setSeconds(seconds)
                        setMinutes(minutes)
                        setDisplayMessage(!displayMessage)
                    }
                } else {
                    setSeconds(seconds - 1)
                }
            }
        }, 1000)
    }, [seconds, start])

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

    return (
        <>
            <div className="pomodoro">
                <div className="message">
                    {displayMessage && <div>Time for a break, good job!</div>}
                    {displayMessage && <div>New session starts in:</div>}
                </div>
                <div className="timer">
                    {timerMinutes}:{timerSeconds}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col sm={8} className="justify-content-center">
                        <Form.Floating>
                            <Form.Control
                                id="floatinSessionCustom"
                                placeholder="Password"
                                type="text"
                                className={`title input`}
                                placeholder="Session minutes (default: 25)"
                                name="session"
                            />
                            <label className="label" htmlFor="floatingSessionCustom">Session minutes (default: 25)</label>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                id="floatinSessionCustom"
                                placeholder="Password"
                                type="text"
                                className={`title input mt-2`}
                                placeholder="Break minutes (default: 5)"
                                name="break"
                            />
                            <label className="label" htmlFor="floatingSessionCustom">Break minutes (default: 5)</label>
                        </Form.Floating>
                    </Col>
                </Row>
                <Col className="d-flex justify-content-center mt-2">
                    <ButtonGroup>
                        <Button
                            onClick={() => {
                            }}
                            className="button"
                            type="submit"
                            size="sm"
                            variant="secondary"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                handleReset()
                            }}
                            className="delete"
                            type="button"
                            size="sm"
                            variant="secondary"
                        >
                            Reset
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button
                        onClick={() => {
                            handleStart()
                        }}
                        className="d-flex justify-content-center mt-2"
                        type="button"
                        size="sm"
                        variant="primary"
                    >
                        Start Timer
                    </Button>
                </Col>
            </Form>
        </>
    )
}