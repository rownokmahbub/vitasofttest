import { useState } from "react";
import axios from "axios";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { FaSquarePlus } from "react-icons/fa6";
import { MdEditDocument } from "react-icons/md";
import { TiDocumentDelete } from "react-icons/ti";
const TodoList = ({ title, tasks, onDelete, totalTasks, onRefresh }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    task: "",
    assigned_to: "",
    assignee: "",
    priority: title,
    due_date: "",
    completed: false,
    completed_at: "",
    created_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://tasks.vitasoftsolutions.com/tasks/",
        newTask
      );
      const createdTask = response.data;
      onRefresh(title);
      // TODO: Update the UI with the created task (add to the corresponding list)
      setShowCreateForm(false);
      setNewTask({
        task: "",
        assigned_to: "",
        assignee: "",
        priority: title,
        due_date: "",
        completed: false,
        completed_at: "",
        created_at: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEdit = (id) => {
    setEditingTask(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://tasks.vitasoftsolutions.com/tasks/${editingTask}/`,
        newTask
      );
      onRefresh(title);
      // TODO: Update the UI with the updated task
      setEditingTask(null);
      setNewTask({
        task: "",
        assigned_to: "",
        assignee: "",
        priority: title,
        due_date: "",
        completed: false,
        completed_at: "",
        created_at: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setNewTask({
      task: "",
      assigned_to: "",
      assignee: "",
      priority: title,
      due_date: "",
      completed: false,
      completed_at: "",
      created_at: "",
    });
  };

  return (
    <div className="container mx-auto flex flex-col gap-5 mt-10 bg-gradient-to-r from-slate-50 to-stone-50 px-4 py-4 rounded-xl border w-full">
      <div className="flex justify-between items-center bg-white border rounded-lg border-l-4 border-purple-500 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-slate-400">{totalTasks}</p>
        </div>
        <Tooltip content="Create Task">
          <Button
            variant="light"
            onClick={() => setShowCreateForm(true)}
            isIconOnly
          >
            <FaSquarePlus className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
      </div>
      <div className="">
        {showCreateForm && (
          <div className="">
            <p className="text-lg font-semibold">Add Task Here</p>
            <form className="flex flex-col gap-3 ">
              <Input
                variant="bordered"
                size="sm"
                type="text"
                label="Add task"
                color="secondary"
                name="task"
                value={newTask.task}
                onChange={handleChange}
                className="w-full bg-white mt-5"
              />

              <Input
                className="w-full bg-white"
                variant="bordered"
                size="sm"
                color="secondary"
                type="text"
                label="Assigned to"
                name="assigned_to"
                value={newTask.assigned_to}
                onChange={handleChange}
              />
              <Input
                className="w-full bg-white"
                variant="bordered"
                size="sm"
                color="secondary"
                type="text"
                label="Assignee"
                name="assignee"
                value={newTask.assignee}
                onChange={handleChange}
              />
              <Input
                className="w-full bg-white"
                variant="bordered"
                size="sm"
                color="secondary"
                type="text"
                label="Priority"
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                readOnly
              />
              <Input
                variant="faded"
                labelPlacement="inside"
                size="sm"
                placeholder="Due Date"
                color="secondary"
                label="Due Date"
                type="date"
                name="due_date"
                value={newTask.due_date}
                onChange={handleChange}
              />
              <Input
                variant="faded"
                labelPlacement="inside"
                size="sm"
                placeholder="Due Date"
                color="secondary"
                label="Completed At"
                type="date"
                name="completed_at"
                value={newTask.completed_at}
                onChange={handleChange}
              />
              <Input
                variant="faded"
                labelPlacement="inside"
                size="sm"
                placeholder="Due Date"
                color="secondary"
                label="Completed At"
                type="date"
                name="created_at"
                value={newTask.created_at}
                onChange={handleChange}
              />

              <div className="mb-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="completed"
                  checked={newTask.completed}
                  onChange={handleChange}
                  className="mr-1"
                />
                <label className="block text-sm font-semibold">
                  Mark as completed
                </label>
              </div>

              <Button
                type="button"
                color="secondary"
                variant="shadow"
                onClick={handleCreate}
                className="w-full"
              >
                Create Task
              </Button>
            </form>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {tasks &&
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border rounded-lg  px-4 py-2.5"
            >
              {editingTask === task.id ? (
                <div className="flex flex-col gap-3 items-start">
                  <p className="text-lg font-semibold">Edit Task</p>
                  <Input
                    variant="faded"
                    size="sm"
                    type="text"
                    label="Add task"
                    name="task"
                    color="success"
                    value={newTask.task}
                    onChange={handleChange}
                    className="bg-white"
                  />
                  <Input
                    variant="faded"
                    size="sm"
                    type="text"
                    label="Assigned to"
                    name="assigned_to"
                    color="success"
                    value={newTask.assigned_to}
                    onChange={handleChange}
                    className="bg-white"
                  />
                  <Input
                    variant="faded"
                    size="sm"
                    type="text"
                    label="Assignee"
                    name="assignee"
                    color="success"
                    value={newTask.assignee}
                    onChange={handleChange}
                    className="bg-white"
                  />

                  <Input
                    variant="faded"
                    labelPlacement="inside"
                    size="sm"
                    type="date"
                    placeholder="Due Date"
                    color="success"
                    label="Due Date"
                    name="due_date"
                    value={newTask.due_date}
                    onChange={handleChange}
                    className="bg-white"
                  />
                  <Input
                    variant="faded"
                    labelPlacement="inside"
                    size="sm"
                    type="date"
                    placeholder="Completed At"
                    color="success"
                    label="Completed At"
                    name="completed_at"
                    value={newTask.completed_at}
                    onChange={handleChange}
                    className="bg-white"
                  />
                  <Input
                    variant="faded"
                    labelPlacement="inside"
                    size="sm"
                    type="date"
                    placeholder="Created At"
                    color="success"
                    label="Created At"
                    name="created_at"
                    value={newTask.created_at}
                    onChange={handleChange}
                    className="bg-white"
                  />

                  <div className="mb-2 flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="completed"
                      checked={newTask.completed}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label className="block text-sm font-semibold">
                      Mark as completed
                    </label>
                  </div>

                  <div className="flex gap-2 items-center justify-end w-full">
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="text-white"
                      color="success"
                      size="sm"
                      variant="shadow"
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="text-base font-semibold text-start">
                      {task.task}
                    </h3>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs text-start">assigned to</h3>
                    <p className="text-sm text-slate-400 line-clamp-1">
                      {task.assigned_to}
                    </p>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs text-start">assignee</h3>
                    <p className="text-sm text-slate-400 line-clamp-1">
                      {task.assignee}
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-2 border-t mt-4 pt-1">
                    <p className="text-xs bg-cyan-600 rounded-full text-white px-2 py-1">
                      {task.priority}
                    </p>

                    <div className="flex  items-center">
                      <Tooltip content="Edit">
                        <Button
                          variant="light"
                          isIconOnly
                          onClick={() => handleEdit(task.id)}
                        >
                          <MdEditDocument className="text-xl text-green-600 cursor-pointer" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <Button
                          variant="light"
                          isIconOnly
                          onClick={() => onDelete(task.id)}
                        >
                          {" "}
                          <TiDocumentDelete className="text-2xl text-red-400 cursor-pointer" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoList;
