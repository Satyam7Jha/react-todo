import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

import "../index.css";

export default function Table({ data, setData, edit, setEdit }) {
  return (
    <div>
      <div className="w-[100%] ">
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
                    className="text-[30px] cursor-pointer text-[#0dcaf0] active:text-[grey]"
                    onClick={() => setEdit(ind)}
                  />
                )}
                {edit === ind && (
                  <select
                    defaultValue={data[ind].status}
                    onChange={(e) => handleEdit(ind, e, data, setData, setEdit)}
                    className="h-[40px] mb-[2px] cursor-pointer border-2 border-[#0dcaf0] rounded-md text-[#0dcaf0] font-bold pl-[5px]"
                  >
                    <option>Todo</option>
                    <option>Complete</option>
                    <option>Pending</option>
                  </select>
                )}
              </div>
              <div className="items ">
                <AiTwotoneDelete
                  className="text-[30px]  text-[grey] active:text-[#0dcaf0] cursor-pointer"
                  onClick={() => handleDelete(data, ind, setData, setEdit)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const handleEdit = (ind, e, data, setData, setEdit) => {
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i != ind) temp.push(data[i]);
  }

  setData([
    ...temp,
    {
      task: data[ind].task,
      status: e.target.value,
    },
  ]);
  setEdit(-1);
};

const handleDelete = (data, ind, setData, setEdit) => {
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i != ind) temp.push(data[i]);
  }
  setData(temp);
  setEdit(-1);
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
        color: status === "Pending" ? "black" : color,
        borderColor: status === "Pending" ? "yellow" : color,
        backgroundColor: status === "Pending" ? color : "",
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
