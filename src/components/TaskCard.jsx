/* eslint-disable react/prop-types */
import "../styles/TaskCard.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

function TaskCard({
  tasksQuantity,
  completedTasks,
  taskWithStatus,
  toggleTaskCompletedById,
  handleReview,
  deleteTaskById,
  handleUpdate,
}) {

  return (
    <section className="tasks">
      <header className="title">
        <div>
          <p className="mt-3">Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className="textBlue mt-3">Completed tasks </p>
          <span>
            {completedTasks} of {tasksQuantity}
            
          </span>
        </div>
      </header>

      <div className="list">

        {taskWithStatus.map((task) => (
          <>
            <div className="backgroundTasks">
              <div key={task.title} className="task">
                <button
                  className="checkContainer"
                  onClick={() => toggleTaskCompletedById(task?.id)}
                >
                  {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
                </button>
                <p
                  className={`${task.isCompleted

                     ? "text-gray-50 text-decoration-line-through " : ""
                  }`}             
                >
                  {task.title}
                </p>

                <div className="mr-n2">
                  <button
                    className="reviewButton"
                    onClick={() => handleReview(task)}
                  >
                    <VscPreview width={100} />
                  </button>

                  <button
                    className="deleteButton"
                    onClick={() => deleteTaskById(task?.id)}
                  >
                    <TbTrash width={100} />
                  </button>

                  <button
                    className="editButton"
                    onClick={() => handleUpdate(task)}
                  >
                    <MdEdit width={100} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export default TaskCard;
