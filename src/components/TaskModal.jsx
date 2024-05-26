/* eslint-disable react/prop-types */
import { Button, Form } from "react-bootstrap";
import { Modal } from "antd";
// import { useState} from "react";
import "../styles/TaskModal.css";

function TaskModal({
  closeModal,
  isModalOpen,
  isUpdateModalOpen,
  isReviewOpen,
  updateTask,
  handleSubmit,
  title,
  setTitle,
  note,
  setNote,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  getTodayDate,
  // Difference_In_Days,
  // calculateDifference
}) {

  // console.log("days left", Difference_In_Days)

  // console.log("taskModal")
  // const handleStartDateChange = (event) => setStartDate(event.target.value);
  // const handleEndDateChange = (event) => setEndDate(event.target.value);
  // const handleStartTimeChange = (event) => setStartTime(event.target.value);
  // const handleEndTimeChange = (event) => setEndTime(event.target.value);

 

  return (
    <Modal
      centered
      onCancel={closeModal}
      open={isModalOpen}
      title={
        isUpdateModalOpen
          ? "Update Task"
          : isReviewOpen
          ? "Task details"
          : "Add Task"
      }
      footer={
        <>
          <Button onClick={closeModal} variant="secondary">
            {isReviewOpen ? "Ok" : "Cancel"}
          </Button>

          {isReviewOpen ? (
            <></>
          ) : (
            <Button
              style={{ marginLeft: "10px" }}
              variant="primary"
              type="submit"
              onClick={isUpdateModalOpen ? updateTask : handleSubmit}
            >
              {isUpdateModalOpen ? "Update" : "Submit"}
            </Button>
          )}
        </>
      }
    >
      <Form>
        <Form.Group>
          <Form.Label className="mt-3 fw-bold fs-6 ">
            {""}Title
            {isReviewOpen ? "" : <span className="text-danger">*</span>}
          </Form.Label>
          {isReviewOpen ? (
            <>
              {": "}
              {<br />}
              {title}{" "}
            </>
          ) : (
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3 fw-bold fs-6 ">{""}Note</Form.Label>
          {isReviewOpen ? (
            <>
              {": "}
              {<br />}
              {note}{" "}
            </>
          ) : (
            <Form.Control
              type="text"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          )}
        </Form.Group>

        <div className="time">
          <Form.Group>
            <Form.Label className="mt-2 fw-bold fs-6 ">
              {""}Start Date
              {isReviewOpen ? "" : <span className="text-danger">*</span>}
            </Form.Label>
            {isReviewOpen ? (
              <>
                {": "}
                {<br />}
                {startDate}{" "}
              </>
            ) : (
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={getTodayDate()}
              />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="mt-2 fw-bold fs-6 ">
              {""}Start Time
              {isReviewOpen ? "" : <span className="text-danger">*</span>}
            </Form.Label>
            {isReviewOpen ? (
              <>
                {": "}
                {<br />}
                {startTime}{" "}
              </>
            ) : (
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            )}
          </Form.Group>
        </div>

        <div className="time">
          <Form.Group>
            <Form.Label className="mt-2 fw-bold fs-6 ">
              {""}End Date
              {isReviewOpen ? "" : <span className="text-danger">*</span>}
            </Form.Label>
            {isReviewOpen ? (
              <>
                {": "}
                {<br />}
                {endDate}{" "}
              </>
            ) : (
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || getTodayDate()}
              />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="mt-2 fw-bold fs-6 ">
              {""}End Time
              {isReviewOpen ? "" : <span className="text-danger">*</span>}
            </Form.Label>
            {isReviewOpen ? (
              <>
                {": "}
                {<br />}
                {endTime}{" "}
              </>
            ) : (
              <Form.Control
                type="time"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            )}
          </Form.Group>
        </div>

        {/* <button onClick={calculateDifference}>Calculate Difference</button>
        <p>Days left: <span>{Difference_In_Days}</span> </p> */}
      </Form>
    </Modal>
  );
}

export default TaskModal;
