import { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dateDifference, setDateDifference] = useState(null);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);
  const handleStartTimeChange = (event) => setStartTime(event.target.value);
  const handleEndTimeChange = (event) => setEndTime(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { title, startDate, endDate, startTime, endTime });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const calculateDateDifference = (start, end, startT, endT) => {
    if (!start || !end) return null;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const startTime = new Date(`1970-01-01T${startT}`);
    const endTime = new Date(`1970-01-01T${endT}`);
    const today = new Date();

    if (endDate < today || (endDate.getTime() === today.getTime() && endTime < today)) {
      return "expired";
    }

    const diffTime = endDate - startDate + (endTime - startTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    const diff = calculateDateDifference(startDate, endDate, startTime, endTime);
    setDateDifference(diff);
  }, [startDate, endDate, startTime, endTime]);

  return (
    <Container>
      {/* <h1>Event Form</h1> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formTitle">
          <Form.Label column sm={2}>Title</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter event title"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formStartDate">
          <Form.Label column sm={2}>Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              min={getTodayDate()}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEndDate">
          <Form.Label column sm={2}>End Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate || getTodayDate()}
              disabled={!startDate}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formStartTime">
          <Form.Label column sm={2}>Start Time</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEndTime">
          <Form.Label column sm={2}>End Time</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </Col>
        </Form.Group>

        

        {dateDifference !== null && (
          <div className="mt-3">
            <strong className='text-danger'>
            {dateDifference === "expired" ? "Expired" : `${dateDifference}`}
            {" "}Day(s) left
            </strong>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default EventForm;
