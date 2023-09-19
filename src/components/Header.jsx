import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [navStatus, setNavStatus] = useState(false);

  return (
    <div className="w-full border-b-[1px] shadow-xl px-2 py-4">
      {/* Desktop */}
      <div className="hidden md:container md:mx-auto md:grid md:grid-cols-4">
        <div className="py-2">
          <Link to="/">
            <img src="mlogo.jpg" alt="Logo" style={{ width: "204px" }} />
          </Link>
        </div>
        <div className="md:col-span-3 py-2">
          <ul className="flex flex-row justify-end space-x-7">
            <li>
              <NavLink to="/" className="textStyle py-3 px-4">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/addquote" className="textStyle py-3 px-4">
                Add Quote
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile */}
      <div className="w-full md:hidden">
        <div className="flex flex-row justify-between">
          <div className="py-2">
            <Link to="/">
              <img src="mlogo.jpg" alt="Logo" style={{ height: "30px" }} />
            </Link>
          </div>
          <div className="py-2">
            <AiOutlineMenu
              size={30}
              onClick={() => setNavStatus((prev) => !prev)}
              className=" cursor-pointer"
            />
          </div>

          <ul
            className={
              navStatus
                ? "fixed bg-[#000300] left-0 top-0 w-[60%] h-full text-white font-sans text-sm ease-in-out duration-500"
                : "fixed left-[-100%] top-0 w-[60%] h-full text-white font-sans text-sm ease-in-out duration-500"
            }
          >
            <li className="p-4 border-b border-gray-600">
              <NavLink to="/" className="mbTextStyle py-3 px-4">
                Home
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink to="/addquote" className="mbTextStyle py-3 px-4">
                Add Quote
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
