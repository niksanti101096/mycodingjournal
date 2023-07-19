import React, { useState, useEffect, useRef } from "react";
import ThoughtsInput from "./ThoughtsInput";
import ThoughtsTable from "./ThoughtsTable";
import Swal from "sweetalert2";

function ThoughtsMain() {
  const loadData = localStorage.getItem("ThoughtsStorage")
    ? JSON.parse(localStorage.getItem("ThoughtsStorage"))
    : [];

  const [thoughtsArray, setThoughtsArray] = useState(loadData);
  const [newThoughts, setThoughts] = useState("");
  const [idHolder, setIdHolder] = useState("");
  const [showSaveChangesBtn, setShowSaveChangesBtn] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(true);
  const inputRef = useRef();

  const dateObj = new Date();

  let dd = String(dateObj.getDate()).padStart(2, "0");
  let mm = String(dateObj.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = dateObj.getFullYear();
  const ddLength = dd.length;
  const mmLength = mm.length;
  if (ddLength === 1) {
    dd = `0${dd}`;
  }
  if (mmLength === 1) {
    mm = `0${mm}`;
  }
  const dateNow = yyyy + "-" + mm + "-" + dd;

  function handleThoughts(e) {
    setThoughts(e.target.value);
  }

  function handleFocus() {
    inputRef.current.focus();
  }

  function handleSave(e) {
    e.preventDefault();
    if (newThoughts !== "") {
      Swal.fire({
        title: `Are you sure you want to add "${newThoughts}" to your thoughts for the day?`,
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#17a2b8",
        confirmButtonText: "Save",
        denyButtonColor: "#dc3545",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const id = Date.now();

          const dateToBeSaved = {
            id: id,
            date: dateNow,
            thoughts: newThoughts,
          };
          setThoughtsArray([...thoughtsArray, dateToBeSaved]);
          Swal.fire("Your thoughts for the day has been saved!", "", "success");
          setThoughts("");
        } else if (result.isDenied) {
          Swal.fire("Thought has not been added!", "", "info");
          setThoughts("");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There should be something in your thoughts...",
      });
    }
  }
  function handleSaveChanges(e) {
    e.preventDefault();
    if (newThoughts !== "") {
      Swal.fire({
        title: "Do you want to save the changes?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#17a2b8",
        confirmButtonText: "Save",
        denyButtonColor: "#dc3545",
        denyButtonText: `Wait, I've changed my mind!`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const updatedData = thoughtsArray.map((item) => {
            if (item.id === idHolder) {
              return {
                id: item.id,
                date: item.date,
                thoughts: newThoughts,
              };
            } else {
              return item;
            }
          });
          setThoughtsArray(updatedData);
          localStorage.setItem("ThoughtsStorage", JSON.stringify(updatedData));
          setThoughts("");
          Swal.fire("Your thought has been edited!", "", "success");
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
    setShowSaveChangesBtn(false);
    setShowSaveBtn(true);
  }

  useEffect(() => {
    localStorage.setItem("ThoughtsStorage", JSON.stringify(thoughtsArray));
  }, [thoughtsArray]);

  return (
    <div className="w-50 border p-4">
      <ThoughtsInput
        dateNow={dateNow}
        newThoughts={newThoughts}
        showSaveChangesBtn={showSaveChangesBtn}
        handleThoughts={handleThoughts}
        handleSave={handleSave}
        handleSaveChanges={handleSaveChanges}
        showSaveBtn={showSaveBtn}
        inputRef={inputRef}
      />
      <ThoughtsTable
        thoughtsArray={thoughtsArray}
        setThoughtsArray={setThoughtsArray}
        setThoughts={setThoughts}
        setShowSaveChangesBtn={setShowSaveChangesBtn}
        setShowSaveBtn={setShowSaveBtn}
        setIdHolder={setIdHolder}
        handleFocus={handleFocus}
      />
    </div>
  );
}

export default ThoughtsMain;
