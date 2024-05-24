import "../styles/HeaderButton.css";
import { Button, Form } from "react-bootstrap";


function HeaderButton({setChangeValue, showModal}) {
  return (
    <div className="inputTask">
      <Button className="px-4" onClick={showModal}>
        Add task
      </Button>

      <Button variant="none">
        <Form.Select
          className="pb-2 pt-2 w-100"
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
