import { useState } from "react";
//import "./styles/task.scss";
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Task(props) {
    const { addTask, deleteTask, moveTask, task } = props;

    const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");

    function setUrgency(event) {
        //setUrgencyLevel(event.target.attributes.urgency.value);
        setUrgencyLevel(event.target.options[event.target.options.selectedIndex].value);
        //console.log(event.target.options[event.target.options.selectedIndex].value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        if (formAction === "save") {
            if (collapsed) {
                setCollapsed(false);
            } else {
                //console.log(event.target.elements.title);
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
        } else if (task.status === "Done") {
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
            newStatus = "Done";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    return (
        <Container className={`task ${collapsed ? "collapsedTask" : ""}`}>
            <Row className="mt-2 mb-3">
                <Col xs={12}>
                    <h4>{task.title}</h4>
                    <p className="desc">Priority: {task.urgency} <br></br> {task.description}</p>
                </Col>
                    <Col xs={12} className="">
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
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </Form.Select>
                            <Button
                                onClick={() => {
                                    setFormAction("save");
                                }}
                                className="button mt-3"
                                type="submit"
                                size="sm"
                            >
                                {collapsed ? "Edit" : "Save"}
                            </Button>
                            {collapsed && (
                                <Button
                                    onClick={() => {
                                        setFormAction("delete");
                                    }}
                                    className="delete delete mt-3 ml-5"
                                    type="submit"
                                    size="sm"
                                >
                                    Delete
                                </Button>
                            )}
                        </Form>
                        {/*<Form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                        <Row>
                            <Col>
                                <input
                                    type="text"
                                    className={`title input ${collapsed ? "hidden" : ""}`}
                                    name="title"
                                    placeholder="Enter Title"
                                    disabled={collapsed}
                                    defaultValue={task.title}
                                />
                                <textarea
                                    rows="2"
                                    className={`description input ${collapsed ? "hidden" : ""}`}
                                    name="description"
                                    placeholder="Enter Description"
                                    defaultValue={task.description}
                                />
                            </Col>
                            <div className={`urgencyLables ${collapsed ? "hidden" : ""}`}>
                                <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
                                    <input
                                        urgency="low"
                                        onChange={setUrgency}
                                        type="radio"
                                        name="urgency"
                                    />
                                    low
                                </label>
                                <label
                                    className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
                                >
                                    <input
                                        urgency="medium"
                                        onChange={setUrgency}
                                        type="radio"
                                        name="urgency"
                                    />
                                    medium
                                </label>
                                <label
                                    className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
                                >
                                    <input
                                        urgency="high"
                                        onChange={setUrgency}
                                        type="radio"
                                        name="urgency"
                                    />
                                    high
                                </label>
                            </div>
                            <Button
                                onClick={() => {
                                    setFormAction("save");
                                }}
                                className="button mt-3"
                                type="submit"
                            >
                                {collapsed ? "Edit" : "Save"}
                            </Button>
                            {collapsed && (
                                <Button
                                    onClick={() => {
                                        setFormAction("delete");
                                    }}
                                    className="button delete mt-3"
                                    type="submit"
                                >
                                    X
                                </Button>
                            )}
                        </Row>
                                </Form>*/}
                    </Col>
                    <Col className="">
                        {collapsed && (
                            <Button onClick={handleMoveLeft} size="sm" className="button moveTask mr-1 mt-1">
                                &#171;
                            </Button>
                        )}
                        {collapsed && (
                            <Button size="sm" onClick={handleMoveRight} className="button moveTask ml-1 mt-1">
                                &#187;
                            </Button>
                        )}
                    </Col>
            </Row>
            {/*<div className={`task ${collapsed ? "collapsedTask" : ""}`}>
                <button onClick={handleMoveLeft} className="button moveTask">
                    &#171;
                </button>
                <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                    <input
                        type="text"
                        className="title input"
                        name="title"
                        placeholder="Enter Title"
                        disabled={collapsed}
                        defaultValue={task.title}
                    />
                    <textarea
                        rows="2"
                        className="description input"
                        name="description"
                        placeholder="Enter Description"
                        defaultValue={task.description}
                    />
                    <div className="urgencyLabels">
                        <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
                            <input
                                urgency="low"
                                onChange={setUrgency}
                                type="radio"
                                name="urgency"
                            />
                            low
                        </label>
                        <label
                            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
                        >
                            <input
                                urgency="medium"
                                onChange={setUrgency}
                                type="radio"
                                name="urgency"
                            />
                            medium
                        </label>
                        <label
                            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
                        >
                            <input
                                urgency="high"
                                onChange={setUrgency}
                                type="radio"
                                name="urgency"
                            />
                            high
                        </label>
                    </div>
                    <button
                        onClick={() => {
                            setFormAction("save");
                        }}
                        className="button"
                    >
                        {collapsed ? "Edit" : "Save"}
                    </button>
                    {collapsed && (
                        <button
                            onClick={() => {
                                setFormAction("delete");
                            }}
                            className="button delete"
                        >
                            X
                        </button>
                    )}
                </form>
                <button onClick={handleMoveRight} className="button moveTask">
                    &#187;
                </button>
            </div>*/}
        </Container>
    );
}