import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderButton from "../components/HeaderButton";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { message } from "antd";
import ChartTask from "../components/ChartTask";


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
  const [dayLeft, setDayLeft] = useState(null);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function showModal() {
    setIsModalOpen(true);
    calculateTimeLeft();
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

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

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
    taskStartTime,
    taskStartDate,
    taskEndDate,
    taskEndTime
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
      message.warning("field required");
    } else {
      addTask(title, note, startDate, startTime, endDate, endTime);
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

  const calculateTimeLeft = () => {
    const endDateTime = new Date(`${endDate}T${endTime}`);
    console.log("endDateTime", endDateTime);
    const now = new Date();
    console.log("now", now);
    const difference = endDateTime - now;
    console.log("difference", difference);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return setDayLeft(timeLeft);
  };

  function updateTask() {
    if (title === "" || endDate === "" || startDate === "") {
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
            dayLeft={dayLeft}
          />
        </div>

        <ChartTask />
      </div>
    </>
  );
}
