import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";
import { AiTwotoneSave } from "react-icons/ai";
import "../index.css";
import useWindowDimensions from "../Hooks/useWindowDimensions";

export default function Table({
  data,
  setData,
  edit,
  setEdit,
  loading,
  setLoading,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { width } = useWindowDimensions();
  const editInput = React.useRef(null);
  const [editValue, setEditValue] = React.useState({
    task: "",
    status: "",
  });

  if (editInput.current !== null) {
    if (width < 700) {
      editInput.current.classList.remove("w-[200px]");
      editInput.current.classList.add("w-[95px]");
    } else {
      editInput.current.classList.remove("w-[95px]");
      editInput.current.classList.add("w-[200px]");
    }
  }
  return (
    <div>
      {loading.loading && (
        <div className="absolute  h-[100%] max-h-[380px] flex justify-center items-center w-[80%] flex-col mt-[-50px] ">
          <Lottie options={defaultOptions} height={250} width={250} />
          <div className="text-[20px] font-bold text-[#0dcaf0] ">
            {loading.message}
          </div>
        </div>
      )}
      <div className="w-[100%] overflow-y-scroll max-h-[375px] min-h-[360px]">
        {data.map((item, ind) => {
          return (
            <div
              key={ind}
              className="header border-b-[2px] border-grey-800 mb-4"
            >
              <div className="items ">{ind}</div>
              <div className="items  r ">
                {(edit === -1 || edit !== ind) && (
                  <div>{compressTask(item.task)}</div>
                )}

                {edit === ind && (
                  <input
                    ref={editInput}
                    placeholder="Edit Task"
                    className="border-2 border-black rounded-lg pl-[10px] mb-[2px]"
                    defaultValue={item.task}
                    onChange={(e) => {
                      setEditValue({ ...editValue, task: e.target.value });
                    }}
                  />
                )}
              </div>
              <div className="items ">
                {(edit === -1 || edit !== ind) && (
                  <StatusText status={item.status} />
                )}

                {edit === ind && (
                  <select
                    defaultValue={data[ind].status}
                    onChange={(e) =>
                      setEditValue({ ...editValue, status: e.target.value })
                    }
                    className="h-[33px] mb-[2px] cursor-pointer border-2 border-[#0dcaf0] rounded-md text-[#0dcaf0] font-bold pl-[5px]"
                  >
                    <option>Todo</option>
                    <option>Complete</option>
                    <option>Pending</option>
                  </select>
                )}
              </div>
              <div className="items ">
                {(edit === -1 || edit !== ind) && (
                  <BiEdit
                    className="text-[30px] cursor-pointer text-[#0dcaf0] active:text-[grey]"
                    onClick={() => {
                      setEditValue({ task: item.task, status: item.status });
                      setEdit(ind);
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Edit Task"
                  />
                )}
                {edit === ind && (
                  <div
                    onClick={() =>
                      handleEdit(
                        ind,
                        editValue,
                        data,
                        setData,
                        setEdit,
                        setLoading
                      )
                    }
                  >
                    <AiTwotoneSave
                      className="text-[30px] cursor-pointer text-green-600 active:text-[grey] "
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Save Task"
                    />
                  </div>
                )}
              </div>
              <div className="items ">
                <AiTwotoneDelete
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Remove Task"
                  className="text-[30px]  text-[grey] active:text-[#0dcaf0] cursor-pointer"
                  onClick={() =>
                    handleDelete(data, ind, setData, setEdit, setLoading)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const handleEdit = (ind, editValue, data, setData, setEdit, setLoading) => {
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i != ind) temp.push(data[i]);
  }
  temp = [
    ...temp,
    {
      task: editValue.task,
      status: editValue.status,
    },
  ];
  temp.sort((a, b) => {
    return a.status > b.status ? -1 : 1;
  });

  setLoading({ loading: true, message: "Saving Task.." });

  setTimeout(() => {
    setData(temp);
    setLoading({ loading: false, message: "Removing Task.." });
  }, 3000);
  setEdit(-1);
};

const handleDelete = (data, ind, setData, setEdit, setLoading) => {
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i != ind) temp.push(data[i]);
  }
  setLoading({ loading: true, message: "Removing Task.." });
  setTimeout(() => {
    setData(temp);
    setLoading({ loading: false, message: "Removing Task.." });
  }, 3000);
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
        borderRadius: "5px",
        marginBottom: "3px",
        paddingRight: "7px",
        paddingLeft: "7px",
        padding: "2px",
      }}
    >
      {status}
    </div>
  );
};

const compressTask = (task) => {
  if (task.length > 20) return task.slice(0, 20) + "...";
  return task;
};
