import { useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import TaskCol from './TaskCol';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  return (
    <div className="App">
      <h1 class="app-name mt-3 mb-3"> ProEfficiency </h1>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Start New Pomodoro Timer</Tooltip>}>
        <div className="timer">
          <FontAwesomeIcon icon={faStopwatch} />
        </div>
      </OverlayTrigger>
      <main>
        <Container>
          <Row>
            <Col>
              <TaskCol
                tasks={tasks}
                addEmptyTask={addEmptyTask}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                status="Backlog"
              />
            </Col>
            <Col>
              <TaskCol
                tasks={tasks}
                addEmptyTask={addEmptyTask}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                status="In Progress"
              />
            </Col>
            <Col>
              <TaskCol
                tasks={tasks}
                addEmptyTask={addEmptyTask}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                status="Complete"
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
