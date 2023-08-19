import { useEffect } from "react";
import { useTasks } from "../../../context/TaskContext";
import { supabase } from "../../../supabase/client";

const TaskList = () => {
  const { tasks, getTask } = useTasks();
  useEffect(() => {
    getTask()
  }, []);

  if (tasks.length === 0) return <p>No hay tasks</p>;

  return (
    <>
      <h3>Lista </h3>
      {tasks.map((task) => (
        <div key={task.id}>
          <div>{task.name}</div>
          <input
            type="checkbox"
            name="done"
            id="done"
            checked={task.done}
            onChange={async () => {
              console.log(!task.done);
              await supabase.from('tasks')
                .update({ done: !task.done })
                .eq('id', task.id)
            }}
          />
        </div>
      ))}
    </>
  );
};

export default TaskList;
