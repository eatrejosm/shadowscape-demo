import {logout} from "../../services/auth.service";
import {useNavigate} from "react-router-dom";

export default function Logout() {
	logout();
	window.location.reload();
	return null;
}
