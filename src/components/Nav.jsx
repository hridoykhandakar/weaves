import { FaMusic } from "react-icons/fa";
import waves from "../assets/waves.svg";
const Nav = ({ libraryStatus, setLibraryStatus }) => {
  // console.log(libraryStatus);
  return (
    <nav>
      <div className="logo">
        <img src={waves} alt="logo" />
      </div>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        <span>Library</span>
        <FaMusic className="icon" />
      </button>
    </nav>
  );
};
export default Nav;
