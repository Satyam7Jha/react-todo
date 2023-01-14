import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

import "../index.css";

export default function Table({ data, setData, edit, setEdit }) {
  return (
    <div>
      <div id="Table" class="w-[100%]">
        {data.map((item, ind) => {
          return (
            <div
              key={ind}
              className="header border-b-[2px] border-grey-800 mb-4"
            >
              <div className="items ">{ind}</div>
              <div className="items  r">{item.task}</div>
              <div className="items ">
                <StatusText status={item.status} />
              </div>
              <div className="items ">
                {(edit === -1 || edit !== ind) && (
                  <BiEdit
                    className="text-[30px] cursor-pointer text-[#99ccff]"
                    onClick={() => setEdit(ind)}
                  />
                )}
                {edit === ind && (
                  <select>
                    <option>Todo</option>
                    <option>Complete</option>
                    <option>Pending</option>
                  </select>
                )}
              </div>
              <div className="items ">
                <AiTwotoneDelete
                  className="text-[30px]  text-[grey] active:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(data, ind, setData)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const handleEdit = (data, ind, taskList, setTaskList, value, setEdit) => {
  let temp = [];
  for (let i = 0; i < taskList.length; i++) {
    if (i != ind) temp.push(taskList[i]);
  }

  setTaskList([
    ...temp,
    {
      task: taskList[ind].task,
      status: value,
    },
  ]);
  setEdit(-1);
};

const handleDelete = (data, ind, setData) => {
  console.log("hii");
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i != ind) temp.push(data[i]);
  }
  setData(temp);
};

const StatusText = ({ status }) => {
  var color = "grey";
  if (status == "Complete") {
    color = "green";
  } else if (status == "Todo") {
    color = "grey";
  } else {
    color = "yellow";
  }
  return (
    <div
      style={{
        color: color,
        borderColor: color,
        borderWidth: "2px",
        fontWeight: "bold",
        border: "2px solid",
        padding: "5px",
        borderRadius: "5px",
        marginBottom: "3px",
      }}
    >
      {status}
    </div>
  );
};
