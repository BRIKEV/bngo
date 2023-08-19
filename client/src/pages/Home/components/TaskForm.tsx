import { useState } from "react";
import { useTasks } from "../../../context/TaskContext";

const TaskForm = () => {
  const [value, handleChange] = useState('');
  const { saveTask } = useTasks();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveTask(value);
  };

  return (
    <div>
      <h2>Task form example</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="task" id="taks" onChange={e => handleChange(e.target.value)} value={value} />
        <button type="submit">Save task</button>
      </form>
    </div>
  );
};


export default TaskForm;
