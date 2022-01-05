import { ReactComponent as Checkmark } from "../../images/check.svg";
import "../../styles/checkmarkPopup.css";

const CheckmarkPopup = () => {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <Checkmark className="confirm" />
      </div>
    </div>
  );
};

export default CheckmarkPopup;
