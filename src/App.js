import React, { Component } from "react";
import useLocalStorage from "./Hooks/useLocalStorage";
import "./App.css";
import Table from "./components/Table";
import AddTask from "./components/AddTask";
import useWindowDimensions from "./Hooks/useWindowDimensions";

const App = () => {
  const [data, setData] = useLocalStorage("Todo-tasks", [
    { task: "work", status: "Todo" },
    { task: "work", status: "Complete" },
    { task: "work", status: "Complete" },
    { task: "work", status: "Pengind" },
    { task: "work", status: "Pending" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
    { task: "work", status: "Todo" },
  ]);
  const [toggleAddTask, setToggle] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(-1);
  const mainDiv = React.useRef(null);

  const { width } = useWindowDimensions();

  if (mainDiv.current !== null) {
    if (width < 600) {
      mainDiv.current.classList.remove("px-[100px]");
    } else {
      mainDiv.current.classList.add("px-[100px]");
    }
  }

  return (
    <div ref={mainDiv} className="px-[100px] pt-[40px] min-w-fit">
      <section className="shadow-2xl rounded-[20px] p-6">
        <div class="sticky top-0 z-20 bg-white ] rounded-[20px]">
          <header class="]">
            <h1 class="text-4xl mb-[50px] font-semibold text-blue-600/100 dark:text-blue-500/100">
              ToDo-List{" "}
            </h1>
          </header>
          <AddTask
            data={data}
            setData={setData}
            toggleAddTask={toggleAddTask}
            setToggle={setToggle}
          />
          <div className="header border-b-4 border-black mb-4">
            <div className="items h">#</div>
            <div className="items h r">Task Name</div>
            <div className="items h">Status</div>
            <div className="items h">Edit</div>
            <div className="items h">Remove</div>
          </div>
        </div>
        <Table data={data} setData={setData} edit={edit} setEdit={setEdit} />
      </section>
    </div>
  );
};

export default App;
