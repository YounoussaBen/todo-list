import "../styles/HeaderButton.css";
import { Button, Form } from "react-bootstrap";


function HeaderButton({setChangeValue, showModal}) {
  return (
    <div className="inputTask">
      <Button className="px-4 h-75 my-auto" onClick={showModal}>
        Add task
      </Button>

      <Button variant="none">
        <Form.Select
          id="select"
          onClick={(e) => setChangeValue(e.target.value)}
        >
          <option value="0">All</option>
          <option value={"complete"}>Completed</option>
          <option value={"incomplete"}>Incomplete</option>
        </Form.Select>
      </Button>
    </div>
  );
}

export default HeaderButton;
