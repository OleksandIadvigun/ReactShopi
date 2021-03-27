import LoginService from "../../services/LoginService";
import {Link} from "react-router-dom";

export default function UserInfo() {
    const {getUserFromLocalStorage} = LoginService();
    const user = getUserFromLocalStorage();

    return (
        <div className="M">
            <div>
                <p className="mesText">
                    USER DETAILS
                </p>
                <div className="userDetail">
                    <section className="flexOne">
                    <div className="ti">username: {user.username}</div>
                    <div className="ti">firstname: {user.firstname}</div>
                    <div className="ti">lastname: {user.lastname}</div>
                    <div className="ti">age: {user.age}</div>
                    <div className="ti">mobile: {user.mobile}</div>
                    <div className="ti">counry: {user.address.country}</div>
                    <div className="ti">city: {user.address.city}</div>
                    <div className="ti">email: {user.email}</div>
                </section>
                </div>
                <br/>
                <Link to={'/editUser'} className="navLink"> Edit</Link>
            </div>
        </div>
    );
}
