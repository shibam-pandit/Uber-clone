import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";

function CaptainSignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

  const firstnameHandler = (e) => {
    setFirstname(e.target.value);
  };
  const lastnameHandler = (e) => {
    setLastname(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const colorHandler = (e) => {
    setColor(e.target.value);
  };

  const plateHandler = (e) => {
    setPlate(e.target.value);
  };

  const capacityHandler = (e) => {
    setCapacity(e.target.value);
  };

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = ({ 
      firstname, lastname, email, password, color, plate, capacity, vehicleType: type 
    });

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captains/register`, newCaptain);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captain", JSON.stringify(data.captain));
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.errors?.[0]?.msg || "Registration failed.");
    }


    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setType("");
  };

  return (
    <div className="bg-[#f2e9db] min-h-screen flex box-border justify-center items-center p-4">
      <div className="bg-[#dfa674] rounded-2xl flex flex-col max-w-3xl w-full py-5 items-center m-5">
        <div className="w-full px-4 md:px-6">
          <h2 className="font-bold text-3xl text-[#002D74] text-center">Captain Sign Up</h2>
          <p className="text-sm my-4 text-[#002D74] text-center">
            Don't have an account, register now.
          </p>
  
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="p-2 rounded-xl border flex-1"
                type="text"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={firstnameHandler}
              />
              <input
                className="p-2 rounded-xl border flex-1"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={lastnameHandler}
              />
            </div>
            <input
              className="p-2 rounded-xl border w-full"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={emailHandler}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={passwordHandler}
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
  
            {/* Vehicle Details */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="p-2 rounded-xl border flex-1"
                name="type"
                value={type}
                onChange={typeHandler}
              >
                <option value="" disabled>
                  Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
              <input
                className="p-2 rounded-xl border flex-1"
                type="text"
                name="color"
                placeholder="Vehicle Color"
                value={color}
                onChange={colorHandler}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="p-2 rounded-xl border flex-1"
                type="text"
                name="plate"
                placeholder="Vehicle Plate"
                value={plate}
                onChange={plateHandler}
              />
              <input
                className="p-2 rounded-xl border flex-1"
                type="number"
                name="capacity"
                placeholder="Vehicle Capacity"
                value={capacity}
                onChange={capacityHandler}
              />
            </div>
  
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium w-full"
              type="submit"
            >
              Create Captain Account
            </button>
          </form>
          <div className="mt-7 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
          </div>
          <button
            className="bg-white border py-2 w-full rounded-xl mt-6 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign Up with Google
          </button>
  
          <div className="mt-4 text-sm container-mr">
            <p className="text-center">
              If you already have an account.. {" "}
              <Link
                to="/captain-login"
                className="text-blue-600 hover:text-blue-900 font-semibold duration-300"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default CaptainSignUp;