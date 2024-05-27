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

    // Calculate and set the day left
    const daysLeft = calculateDifference(task.startDate, task.endDate);
    task.dayLeft = daysLeft;
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

    // Calculate and set the day left
    const daysLeft = calculateDifference(task.startDate, task.endDate);
    task.dayLeft = daysLeft;
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
  }, [selectedStatus]);

  function addTask(
    taskTitle,
    taskNote,
    taskStartDate,
    taskStartTime,
    taskEndDate,
    taskEndTime
  ) {
    const dayLeft = calculateDifference(taskStartDate, taskEndDate);
    
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
        dayLeft: dayLeft,
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

  function calculateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return null;
    }

    const Difference_In_Time = end.getTime() - start.getTime();
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    if (Difference_In_Days < 0) {
      message.error("expired");
      return null;
    } else {
      message.info(`You have ${Difference_In_Days} day(s) left`);
    }

    return Difference_In_Days;
  }

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
      const updatedTask = tasks.map((task) => {
        if (task.id == tempTask?.id) {
          const dayLeft = calculateDifference(startDate, endDate);
          return {
            ...task,
            isCompleted: tempTask.isCompleted,
            title: title,
            note: note,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            dayLeft: dayLeft,
          };
        }
        return task;
      });

      setTasksAndSave(updatedTask);
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
            // Difference_In_Days added to pass daysLeft to the TaskModal
            differenceInDays={tempTask?.dayLeft}
          />
        </div>

        <ChartTask />
      </div>

      {/* <Essay /> */}
    </>
  );
}
