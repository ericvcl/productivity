import { useState } from "react";
import { Container, Row, Col, Button, Form, ButtonGroup, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Task(props) {
    const { addTask, deleteTask, moveTask, task } = props;

    const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");

    function setUrgency(event) {
        setUrgencyLevel(event.target.options[event.target.options.selectedIndex].value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        if (formAction === "save") {
            if (collapsed) {
                setCollapsed(false);
            } else {
                let newTask = {
                    id: task.id,
                    title: event.target.elements.title.value,
                    description: event.target.elements.description.value,
                    urgency: urgencyLevel,
                    status: task.status,
                    isCollapsed: true,
                };

                addTask(newTask);
                setCollapsed(true);

            }
        }

        if (formAction === "delete") {
            deleteTask(task.id);
        }
    }

    function handleMoveLeft() {
        let newStatus = "";

        if (task.status === "In Progress") {
            newStatus = "Backlog";
        } else if (task.status === "Complete") {
            newStatus = "In Progress";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    function handleMoveRight() {
        let newStatus = "";

        if (task.status === "Backlog") {
            newStatus = "In Progress";
        } else if (task.status === "In Progress") {
            newStatus = "Complete";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    return (
        <Container className={`task mb-2 ${collapsed ? "collapsedTask" : ""}`}>
            <Row className="mt-2 mb-3">
                <Col xs={12}>
                    <h4 className="task-title">{task.title}</h4>
                    <Accordion defaultActiveKey="0" className={`${!collapsed ? "hidden" : ""}`}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Details</Accordion.Header>
                            <Accordion.Body>
                                Priority: {task.urgency} 
                                <br></br>
                                Description: {task.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col xs={12}>
                    <Form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                        <Form.Control
                            type="text"
                            className={`title input ${collapsed ? "hidden" : ""}`}
                            placeholder="Task Title.."
                            name="title"
                        />
                        <Form.Control
                            as="textarea"
                            className={`title input ${collapsed ? "hidden" : ""}`}
                            placeholder="Task Description.."
                            rows={2}
                            name="description"
                        />
                        <Form.Select onChange={setUrgency} name="urgency" className={`${collapsed ? "hidden" : ""}`} aria-label="Default select example">
                            <option>Task Priority..</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Select>
                        <ButtonGroup>
                            <Button
                                onClick={() => {
                                    setFormAction("save");
                                }}
                                className="button mt-1 mr-2"
                                type="submit"
                                size="sm"
                                variant="primary"
                            >
                                {collapsed ? "Edit" : "Save"}
                            </Button>
                            {collapsed && (
                                <Button
                                    onClick={() => {
                                        setFormAction("delete");
                                    }}
                                    className="delete mt-1"
                                    type="submit"
                                    size="sm"
                                    variant="primary"
                                >
                                    Delete
                                </Button>
                            )}
                        </ButtonGroup>
                    </Form>
                </Col>
                <Col>
                    <ButtonGroup>
                        {collapsed && (
                            <Button onClick={handleMoveLeft} size="sm" className="button-lr moveTask mr-1 mt-1" variant="secondary">
                                &#171;
                            </Button>
                        )}
                        {collapsed && (
                            <Button size="sm" onClick={handleMoveRight} className="button-lr moveTask ml-1 mt-1" variant="secondary">
                                &#187;
                            </Button>
                        )}
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    );
}