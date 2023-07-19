import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

function ThoughtsTable({
  thoughtsArray,
  setThoughtsArray,
  setThoughts,
  setShowSaveChangesBtn,
  setShowSaveBtn,
  setIdHolder,
  handleFocus,
}) {
  function handleDelete(data) {
    Swal.fire({
      title: `Are you sure you want to delete "${data.thoughts}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
      denyButtonColor: "#17a2b8",
      showDenyButton: true,
      denyButtonText: "Wait, I've changed my mind!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = JSON.parse(
          localStorage.getItem("ThoughtsStorage")
        ).filter((item) => item.id !== data.id);
        setThoughtsArray(newData);
        localStorage.setItem("ThoughtsStorage", JSON.stringify(newData));
        Swal.fire("Deleted!", "Your thought has been deleted.", "success");
      } else if (result.isDenied) {
        Swal.fire("Your thought is safe!", "", "info");
      }
    });
  }
  function handleEdit(item) {
    setThoughts(item.thoughts);
    setShowSaveChangesBtn(true);
    setShowSaveBtn(false);
    setIdHolder(item.id);
    handleFocus();
  }
  return (
    <div className="mt-3">
      <div>
        <h4 className="bg-info text-light p-3">Thoughts for the Day</h4>
      </div>
      <div className="striped">
        {thoughtsArray.map((item, index) => (
          <div key={index} className="d-flex justify-content-between mt-3">
            <p className=" fs-5">
              <b className=" text-success">Date:</b> {item.date} <br />
              {item.thoughts}
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

export default ThoughtsTable;
