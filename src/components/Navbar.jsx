import React, { useState, useEffect } from "react";
// import logo from "../assets/Get-fit-Logo.png";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "features/user";
// import { API_URL } from "config";

const Navbar = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.user);
const isAuthenticated = true;
//   const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isVisible = prevScrollPos > currentScrollPos;
    setPrevScrollPos(currentScrollPos);
    setVisible(isVisible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const authLinks = (
    <div className="md:ml-auto md:mr-4 flex items-center cursor-pointer ">
      <button
        className="bg-white rounded-md mr-2 text-sm px-4 py-1 h-8 mt-2 hover:bg-cyan-400"
        // onClick={() => {
        //   dispatch(logout());
        // }}
      >
        Logout
      </button>
      <button>Vishnu</button>

      {/* <button
        onClick={() => {
          if (user?.is_superuser) {
            navigate("/admin/dashboard");
          } else {
            navigate("/TrainerDashboard");
          }
        }}
      >
        <div className="text-white font-mono flex ml-4 items-center ">
          {user?.profile_picture ? (
            <img
              className="w-8 h-8 mr-2 rounded-full object-cover"
              src={`${API_URL}${user?.profile_picture}`}
              alt="user"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 rounded-full"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <p>{user?.first_name}</p>
        </div>
      </button> */}
    </div>
  );

  const guestLinks = (
    <div className="flex flex-row ml-0 md:ml-auto md:mr-4">
      <Link to="/login">
        <button className="bg-white font-bold w-24 rounded-md mr-2 text-sm px-4 py-1 hover:bg-black hover:text-white">
          Log In
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-white font-bold w-24 rounded-md text-sm px-4 py-1 hover:bg-black hover:text-white">
          Sign Up
        </button>
      </Link>
    </div>
  );

//   const handleDropdownChange = (e) => {
//     const selectedOption = e.target.value;
//     if (selectedOption === "option1") {
//       navigate("/login");
//     } else if (selectedOption === "option2") {
//       navigate("/register");
//     } else if (selectedOption === "option3") {
//       navigate("/chat");
//     } else if (selectedOption === "option4") {
//       if (user?.is_superuser) {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/dashboard");
//       }
//     }
//   };

  return (
    <div
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex h-20 flex-col md:flex-row items-start justify-between p-2 md:p-6 w-full z-[100] absolute bg-gray-600 bg-opacity-40">
        <Link to="/">
          <div className="flex items-center">
            {/* <img className="h-12 md:h-10 mr-2" src={logo} alt="logo" /> */}
            <h1 className="text-white text-4xl cursor-pointer font-blackops-one md:block hidden">
              TODO
            </h1>
          </div>
        </Link>
        <div className="flex flex-auto items-end md:hidden">
          <button
            // onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg> */}
          </button>
        </div>

        <div
          className={`flex flex-col md:flex md:flex-row md:flex-grow items-center ${
            isOpen ? "block bg-black/75 w-60 " : "hidden"
          }`}
        >
          <div className="flex w-full flex-col md:flex-row justify-center items-center">
            {/* <Link to="/findTrainer">
              <div className="h-10 mt-5 md:mt-0 md:h-0">
                <a
                  className="hover:text-black md:text-base mx-5 mb-[15px] font-bold text-white"
                  href="!#"
                >
                  Find trainers
                </a>
              </div>
            </Link>
            <Link to="/programmes">
              <div className="h-10 mt-5 md:mt-0 md:h-0">
                <a
                  className="hover:text-black mx-5 font-bold text-white"
                  href="!#"
                >
                  Programms
                </a>
              </div>
            </Link> */}
            {/* {!user?.is_trainer && !user?.is_superuser && (
              <Link to="/trainerRegister">
                <div className="h-10 mt-5 md:mt-0 md:h-0">
                  <a
                    className="hover:text-black mx-5 font-bold text-white"
                    href="!#"
                  >
                    Join as Trainer
                  </a>
                </div>
              </Link>
            )} */}
            <h2>Register</h2>
            <h2>Register</h2>
            <h2>Register</h2>

          </div>

          <div className="flex h-10 mt-5 md:mt-0 md:h-0">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
