import React from "react";

function ThoughtsInput({
  dateNow,
  newThoughts,
  showSaveChangesBtn,
  handleThoughts,
  handleSave,
  handleSaveChanges,
  showSaveBtn,
  inputRef
}) {
  return (
    <form onSubmit={handleSave}>
      <div className="d-flex justify-content-between">
        <h3 className="fw-bolder">Thoughts for the Day</h3>
        <div className="d-flex form-group">
          <h3 className="me-2">Date:</h3>
          <input
            type="date"
            name="date"
            className="form-control text-center"
            placeholder="Default input"
            id="date"
            value={dateNow}
            readOnly
          />
        </div>
      </div>
      <div className="form-group mt-3">
        <textarea
          className="form-control"
          name="thoughts"
          id="thoughts"
          placeholder="Your thoughts here..."
          rows="3"
          value={newThoughts}
          onChange={handleThoughts}
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
  );
}

export default ThoughtsInput;
