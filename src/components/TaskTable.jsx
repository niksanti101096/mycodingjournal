import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

function TaskTable({
  tasksArray,
  setTasksArray,
  setTaskDate,
  setTasks,
  setShowSaveBtn,
  setShowSaveChangesBtn,
  setIdHolder,
  handleFocus
}) {
  function handleDelete(data) {

    Swal.fire({
      title: `Are you sure you want to delete "${data.task}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
      denyButtonColor: "#17a2b8",
      showDenyButton: true,
      denyButtonText: "Wait, I've changed my mind!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = JSON.parse(localStorage.getItem("TasksStorage")).filter(
          (item) => item.id !== data.id
        );
        setTasksArray(newData);
        localStorage.setItem("TasksStorage", JSON.stringify(newData));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } else if (result.isDenied) {
        Swal.fire("Your task is safe!", "", "info");
      }
    });
  }

  function handleEdit(item) {
    setTasks(item.task);
    setTaskDate(item.date);
    setShowSaveBtn(false);
    setShowSaveChangesBtn(true);
    setIdHolder(item.id)
    handleFocus()
  }
  return (
    <div className="mt-3">
      <div>
        <h4 className="bg-info text-light p-3">Tasks</h4>
      </div>
      <div className="striped">
        {tasksArray.map((item, index) => (
          <div key={index} className="d-flex justify-content-between mt-3">
            <p className=" fs-5">
              <b className=" text-success">Date:</b> {item.date} <br />
              {item.task}
            </p>
            <div>
              <Button
                className=" text-warning me-3"
                onClick={() => handleEdit(item)}
              >
                <EditIcon />
              </Button>
              <Button
                className=" text-danger"
                onClick={() => handleDelete(item)}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskTable;
