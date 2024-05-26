import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderButton from "../components/HeaderButton";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { message } from "antd";
import ChartTask from "../components/ChartTask";
import Essay from "../components/Essay";

const LOCAL_STORAGE_KEY = "todo:tasks";

export function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [selectedStatus, setChangeValue] = useState(0);
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [tempTask, setTempTask] = useState(null);
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const tasksQuantity = tasks.length;
  // const [dayLeft, setDayLeft] = useState(null);
  // const [Difference_In_Days, setDifference_In_Days] = useState(null)

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function showModal() {
    setIsModalOpen(true);
    // calculateTimeLeft();
  }

  function handleUpdate(task) {
    showModal();
    setUpdateIsModalOpen(true);
    setTempTask(task);
    setTitle(task?.title);
    setNote(task?.note);
    setStartDate(task?.startDate);
    setStartTime(task?.startTime);
    setEndDate(task?.endDate);
    setEndTime(task?.endTime);
  }

  function handleReview(task) {
    showModal();
    setIsReviewOpen(true);
    setTempTask(task);
    setTitle(task?.title);
    setNote(task?.note);
    setStartDate(task?.startDate);
    setStartTime(task?.startTime);
    setEndDate(task?.endDate);
    setEndTime(task?.endTime);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdateIsModalOpen(false);
    setIsReviewOpen(false);
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setTitle("");
    setNote("");
  };

  const taskWithStatus = tasks.filter((item) => {
    if (selectedStatus === "complete") {
      return item.isCompleted === true;
    } else if (selectedStatus === "incomplete") {
      return item.isCompleted === false;
    } else {
      return item;
    }
  });

  useEffect(() => {
    loadSavedTasks();

    // getFiltered()
  }, [selectedStatus]);

  function addTask(
    taskTitle,
    taskNote,
    taskStartDate,
    taskStartTime,
    taskEndDate,
    taskEndTime,
    // dayLeft
  ) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        note: taskNote,
        startDate: taskStartDate,
        startTime: taskStartTime,
        endDate: taskEndDate,
        endTime: taskEndTime,
        // dayLeft,
        isCompleted: false,
      },
    ]);
  }

  function handleSubmit() {
    if (
      title === "" ||
      startDate === "" ||
      startTime === "" ||
      endDate === "" ||
      endTime === ""
    ) {
      message.warning("fields required");
    } else {
      addTask(title, note, startDate, startTime, endDate, endTime);
      console.log("startTime is here", addTask);
      closeModal();
    }
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // function calculateDifference () {
  //   // const date1 = new Date({startDate});
  //   // const date2 = new Date(endDate);

  //   // Calculating the time difference of two dates
  //   const Difference_In_Time = endDate.getTime() - startDate.getTime();

  //   // Calculating the number of days between two dates
  //   const Difference_In_Days = Math.round(
  //     Difference_In_Time / (1000 * 3600 * 24)
  //   );

  //   if(Difference_In_Days < 0) {
  //     message.error("expired")
  //   }
  //   return setDifference_In_Days(Difference_In_Days);
  // }

  function updateTask() {
    if (
      title === "" ||
      endDate === "" ||
      startDate === "" ||
      endTime === "" ||
      endDate === ""
    ) {
      message.warning("field required");
    } else {
      const newTasks = tasks.map((task) => {
        if (task.id == tempTask?.id) {
          return {
            ...task,
            isCompleted: tempTask.isCompleted,
            title: title,
            note: note,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            // dayLeft: dayLeft,
          };
        }
        return task;
      });

      setTasksAndSave(newTasks);
      message.success("Task Updated successfully");
      closeModal();
    }
  }

  return (
    <>
      <div className="taskPage">
        <div className="todo">
          <Header />
          <HeaderButton setChangeValue={setChangeValue} showModal={showModal} />
          <TaskCard
            tasks={tasks}
            tasksQuantity={tasksQuantity}
            completedTasks={completedTasks}
            taskWithStatus={taskWithStatus}
            toggleTaskCompletedById={toggleTaskCompletedById}
            handleReview={handleReview}
            deleteTaskById={deleteTaskById}
            handleUpdate={handleUpdate}
          />

          <TaskModal
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            isUpdateModalOpen={isUpdateModalOpen}
            isReviewOpen={isReviewOpen}
            handleSubmit={handleSubmit}
            updateTask={updateTask}
            title={title}
            setTitle={setTitle}
            note={note}
            setNote={setNote}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endDate={endDate}
            setEndDate={setEndDate}
            endTime={endTime}
            setEndTime={setEndTime}
            getTodayDate={getTodayDate}
            // dayLeft={dayLeft}
            // Difference_In_Days = {Difference_In_Days}
            // calculateDifference={calculateDifference}
          />
        </div>

        <ChartTask />
      </div>

      {/* <Essay /> */}
    </>
  );
}
