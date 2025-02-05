import { FaUserAlt } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import homeLogo from '../assets/homePageLogo.png';

const Navbar = ({ user, userName, isSidebarVisible, toggleSidebar, LogOutUser }) => (
  <div className="navbarHome">
    <div className="logoScsn">
      <img src={homeLogo} className="homeLogo" alt="MainLogo" />
    </div>
    <div>
      {!isSidebarVisible && (
        <FaUserAlt className="userPhoto" onClick={toggleSidebar} />
      )}

      <div className={`sideBar ${isSidebarVisible ? "visible" : ""}`}>
        <IoCloseSharp className="closeNavBar" onClick={toggleSidebar} />
        <div>
          <p className="userName">Hello, {userName || user.displayName || "User"}</p>
          <p className="userEmail">{user.email || "No email provided"}</p>
        </div>
        <button onClick={LogOutUser} className="userLogOutBtn">
          Log Out
        </button>
      </div>
    </div>
  </div>
);

export default Navbar;