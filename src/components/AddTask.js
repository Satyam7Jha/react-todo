import React from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";

export default function AddTask({ toggleAddTask, setToggle, data, setData }) {
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
  var tempTask = "";
  var tempStatus = "Todo";

  const handleSubmit = (e) => {
    e.preventDefault();
    var temp = [{ task: tempTask, status: tempStatus }, ...data];
    temp.sort((a, b) => {
      return a.status > b.status ? -1 : 1;
    });
    setData(temp);
    setToggle(false);
  };

  return (
    <div className="flex flex-row-reverse mb-6 items-center  ">
      <div>
        <div></div>
        {toggleAddTask === true && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-wrap  items-center  space-y-2 space-x-2 "
          >
            <div></div>
            <select
              className="h-[40px] cursor-pointer border-2 border-[#0dcaf0] rounded-md text-[#0dcaf0] font-bold pl-[5px]"
              name="status"
              id="status"
              onChange={(e) => {
                tempStatus = e.target.value;
              }}
            >
              <option value="Todo">Todo</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>

            <input
              required
              onChange={(e) => (tempTask = e.target.value)}
              ref={inputDiv}
              placeholder="Add Task"
              className="flex-grow  h-[40px] pl-3 border-2 border-[#0dcaf0] rounded-md w-[200px]"
            />
            <button
              type="submit"
              className="flex-grow border-2 h-[40px] w-[95px] border-[#0dcaf0] text-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-white font-bold  rounded active:opacity-40"
            >
              Submit
            </button>
          </form>
        )}

        {toggleAddTask === false && (
          <div className="space-y-2 space-x-2">
            <div></div>
            <button
              onClick={() => setToggle(true)}
              className=" border-2 h-[40px] w-[95px] text-m border-[#0dcaf0] text-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-white font-bold py-2 px-2 rounded active:opacity-40"
            >
              Add Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
