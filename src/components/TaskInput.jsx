import React from "react";

function TaskInput({
  taskDate,
  handleTasks,
  tasks,
  handleDate,
  handleSave,
  showSaveBtn,
  showSaveChangesBtn,
  handleSaveChanges,
  inputRef
}) {
  const dateObj = new Date();
  const monthLength = (dateObj.getMonth() + 1).toLocaleString().length;
  let dayNow = dateObj.getMonth() + 1;

  if (monthLength === 1) {
    dayNow = `0${dateObj.getMonth() + 1}`;
  } else {
    dayNow = dateObj.getMonth() + 1;
  }
  const dateNow =
    dateObj.getFullYear() + "-" + dayNow + "-" + dateObj.getDate();
  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="d-flex justify-content-between">
          <h3 className="fw-bolder">Task</h3>
          <div className=" d-flex form-group">
            <h3 className="me-2">Date:</h3>
            <input
              type="date"
              className="form-control"
              placeholder="Default input"
              min={dateNow}
              value={taskDate}
              onChange={handleDate}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <textarea
            className="form-control"
            name="tasks"
            id="tasks"
            placeholder="Your tasks here..."
            rows="3"
            value={tasks}
            onChange={handleTasks}
            ref={inputRef}
          ></textarea>
        </div>
        <div className="text-end mt-3">
          {showSaveChangesBtn && (
            <button
              type="button"
              className="btn btn-outline-warning btn-lg"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}
          {showSaveBtn && (
            <button type="submit" className="btn btn-outline-info btn-lg">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskInput;
