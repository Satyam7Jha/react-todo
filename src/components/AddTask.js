import React from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";

export default function AddTask({ toggleAddTask, setToggle }) {
  const inputDiv = React.useRef(null);
  const { width } = useWindowDimensions();

  if (inputDiv.current !== null) {
    if (width < 600) {
      inputDiv.current.classList.remove("w-[200px]");
      inputDiv.current.classList.add("w-[95px]");
    } else {
      inputDiv.current.classList.remove("w-[95px]");
      inputDiv.current.classList.add("w-[200px]");
    }
  }

  return (
    <div className="flex flex-row-reverse mb-6 items-center ">
      <form className="flex flex-wrap  items-center  space-y-2 space-x-2 ">
        <div></div>
        {toggleAddTask === true && (
          <>
            <select
              className="h-[40px] cursor-pointer border-2 border-[#0dcaf0] rounded-md text-[#0dcaf0] font-bold "
              name="status"
              id="status"
            >
              <option value="Todo">Todo</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>
            <input
              ref={inputDiv}
              placeholder="Add Task"
              className="flex-grow  h-[40px] pl-3 border-2 border-[#0dcaf0] rounded-md w-[200px]"
            />
            <button className="flex-grow border-2 h-[40px] w-[95px] border-[#0dcaf0] text-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-white font-bold  rounded active:opacity-40">
              Submit
            </button>
          </>
        )}

        {toggleAddTask === false && (
          <button
            onClick={() => setToggle(true)}
            className="border-2 h-[40px] w-[95px] text-m border-[#0dcaf0] text-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-white font-bold py-2 px-2 rounded active:opacity-40"
          >
            Add Task
          </button>
        )}
      </form>
    </div>
  );
}
