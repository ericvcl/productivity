import { useState} from "react";
import {
    OverlayTrigger,
    Tooltip,
    Modal,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Pomodoro from "./Pomodoro";

function TimerModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Start New Pomodoro Timer</Tooltip>}>
                <div className="timer" onClick={handleShow}>
                    <FontAwesomeIcon icon={faStopwatch} />
                </div>
            </OverlayTrigger>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pomodoro Timer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Pomodoro />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TimerModal;