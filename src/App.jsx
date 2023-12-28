// src/App.js
import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TodoList";

function App() {
  const [taskLists, setTaskLists] = useState({
    Backlog: { tasks: [], shouldRefresh: false },
    Todo: { tasks: [], shouldRefresh: false },
    Doing: { tasks: [], shouldRefresh: false },
    Done: { tasks: [], shouldRefresh: false },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tasks.vitasoftsolutions.com/tasks/"
        );
        const { data } = response;

        const updatedTaskLists = {
          Backlog: {
            tasks: data.tasks.filter((task) => task.priority === "Backlog"),
            shouldRefresh: false,
          },
          Todo: {
            tasks: data.tasks.filter((task) => task.priority === "Todo"),
            shouldRefresh: false,
          },
          Doing: {
            tasks: data.tasks.filter((task) => task.priority === "Doing"),
            shouldRefresh: false,
          },
          Done: {
            tasks: data.tasks.filter((task) => task.priority === "Done"),
            shouldRefresh: false,
          },
        };

        setTaskLists(updatedTaskLists);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [
    taskLists.Backlog.shouldRefresh,
    taskLists.Todo.shouldRefresh,
    taskLists.Doing.shouldRefresh,
    taskLists.Done.shouldRefresh,
  ]);

  const handleDelete = async (id, priority) => {
    try {
      await axios.delete(`https://tasks.vitasoftsolutions.com/tasks/${id}/`);

      setTaskLists((prevTaskLists) => {
        const updatedTaskLists = { ...prevTaskLists };
        updatedTaskLists[priority].tasks = updatedTaskLists[
          priority
        ].tasks.filter((task) => task.id !== id);
        return updatedTaskLists;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleRefresh = (priority) => {
    setTaskLists((prevTaskLists) => {
      const updatedTaskLists = { ...prevTaskLists };
      updatedTaskLists[priority].shouldRefresh =
        !updatedTaskLists[priority].shouldRefresh;
      return updatedTaskLists;
    });
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5">
      {Object.keys(taskLists).map((priority) => (
        <TaskList
          key={priority}
          title={priority}
          tasks={taskLists[priority].tasks}
          onDelete={(id) => handleDelete(id, priority)}
          totalTasks={taskLists[priority].tasks.length}
          onRefresh={() => handleRefresh(priority)}
        />
      ))}
    </div>
  );
}

export default App;
