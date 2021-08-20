import Task from "./Task";
//import "./styles/statusLine.scss";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TaskCol(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;

  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3 className="status-title">{status}</h3>
      {taskList}
      <Button onClick={handleAddEmpty} className="button addTask mt-1">
        +
      </Button>
    </div>
  );
}