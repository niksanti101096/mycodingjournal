import React, { useEffect, useState, useRef } from "react";
import TaskInput from "./TaskInput";
import TaskTable from "./TaskTable";
import Swal from "sweetalert2";

function TasksMain() {
  const loadData = localStorage.getItem("TasksStorage")
    ? JSON.parse(localStorage.getItem("TasksStorage"))
    : [];

  const [tasksArray, setTasksArray] = useState(loadData);
  const [taskDate, setTaskDate] = useState("");
  const [tasks, setTasks] = useState("");
  const [showSaveBtn, setShowSaveBtn] = useState(true);
  const [showSaveChangesBtn, setShowSaveChangesBtn] = useState(false);
  const [idHolder, setIdHolder] = useState("");
  const inputRef = useRef();

  function handleTasks(e) {
    setTasks(e.target.value);
  }
  function handleDate(e) {
    setTaskDate(e.target.value);
  }
  function handleSave(e) {
    e.preventDefault();
    if (tasks !== "" && taskDate !== "") {
      Swal.fire({
        title: `Are you sure you want to add "${tasks}" to your thoughts for the day?`,
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#17a2b8",
        confirmButtonText: "Save",
        denyButtonColor: "#dc3545",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const id = Date.now();

          const newTask = {
            id: id,
            task: tasks,
            date: taskDate,
          };
          setTasksArray([...tasksArray, newTask]);
          setTasks("");
          setTaskDate("");
          Swal.fire("Your task has been added!", "", "success");
        } else if (result.isDenied) {
          setTasks("");
          setTaskDate("");

          Swal.fire("Your task has not been added!", "", "info");
        }
      });
    } else {
      if (tasks === "" && taskDate !== "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There should be something to work on!",
        });
      } else if (taskDate === "" && tasks !== "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "When should I add your task?",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There's nothing to be saved!",
        });
      }
    }
  }

  function handleFocus() {
    inputRef.current.focus();
  }

  function handleSaveChanges(e) {
    e.preventDefault();
    if (tasks !== "" && taskDate !== "") {
      Swal.fire({
        title: "Do you want to save the changes?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#17a2b8",
        confirmButtonText: "Save",
        denyButtonColor: "#dc3545",
        denyButtonText: `Wait, I've changed my mind!`,
      }).then((result) => {
        if (result.isConfirmed) {
          const updateData = tasksArray.map((item) => {
            if (item.id === idHolder) {
              return {
                ...item,
                task: tasks,
                date: taskDate,
              };
            } else {
              return item;
            }
          });
          setTasksArray(updateData);
          setTasks("");
          setTaskDate("");
          localStorage.setItem("TasksStorage", JSON.stringify(updateData));
          Swal.fire("Your task has been edited!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There should be something to change!',
      })
    }
    setShowSaveBtn(true);
    setShowSaveChangesBtn(false);
  }
  useEffect(() => {
    localStorage.setItem("TasksStorage", JSON.stringify(tasksArray));
  }, [tasksArray]);
  return (
    <div className="w-50 border p-4">
      <TaskInput
        taskDate={taskDate}
        tasks={tasks}
        handleTasks={handleTasks}
        handleDate={handleDate}
        handleSave={handleSave}
        showSaveBtn={showSaveBtn}
        showSaveChangesBtn={showSaveChangesBtn}
        handleSaveChanges={handleSaveChanges}
        inputRef={inputRef}
      />
      <TaskTable
        tasksArray={tasksArray}
        setTasksArray={setTasksArray}
        setTaskDate={setTaskDate}
        setTasks={setTasks}
        setShowSaveBtn={setShowSaveBtn}
        setShowSaveChangesBtn={setShowSaveChangesBtn}
        setIdHolder={setIdHolder}
        handleFocus={handleFocus}
      />
    </div>
  );
}

export default TasksMain;
