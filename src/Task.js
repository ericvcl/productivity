import { useState } from "react";
//import "./styles/task.scss";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Task(props) {
    const { addTask, deleteTask, moveTask, task } = props;

    const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");

    function setUrgency(event) {
        setUrgencyLevel(event.target.attributes.urgency.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

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
            <Row className="mt-3 mb-3">
                <Col xs={12}>
                    <h2>{task.title}</h2>
                    <p>Priority: {task.urgency}</p>
                    <p>{task.description}</p>

                </Col>
                <Col>
                    <button onClick={handleMoveLeft} className="button moveTask my-5">
                        &#171;
                    </button>
                </Col>
                <Col xs={8}>
                    <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
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
                            <button
                                onClick={() => {
                                    setFormAction("save");
                                }}
                                className="button mt-3"
                            >
                                {collapsed ? "Edit" : "Save"}
                            </button>
                            {collapsed && (
                                <button
                                    onClick={() => {
                                        setFormAction("delete");
                                    }}
                                    className="button delete mt-3"
                                >
                                    X
                                </button>
                            )}
                        </Row>
                    </form>
                </Col>
                <Col>
                    <button onClick={handleMoveRight} className="button moveTask my-5">
                        &#187;
                    </button>
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