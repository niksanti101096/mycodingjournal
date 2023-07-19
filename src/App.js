import ThoughtsMain from "./components/ThoughtsMain";
import TasksMain from "./components/TasksMain";

function App() {
  return (
    <div className="container-fluid mt-4 px-5">
      <h1 className="text-center">My Coding Journal</h1>
      <div className=" d-flex column-gap-5">
        <ThoughtsMain></ThoughtsMain>
        <TasksMain></TasksMain>
      </div>
    </div>
  );
}

export default App;
