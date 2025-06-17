import React, { useState } from "react";
import instance from "../utils/instance";
import { Link, useNavigate } from "react-router-dom";

const defaultData = {
  name: "",
  email: "",
  password: "",
  age: "",
  dob: "",
  company_name: "",
  profile_pic: null,
};

const Signup = () => {
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          error = "Name is required.";
        } else if (value.trim().length < 3) {
          error = "Name must be at least 3 characters long.";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format.";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        } else if (value.trim().length < 6) {
          error = "Password must be at least 6 characters long.";
        } else if (
          !/[A-Z]/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[^A-Za-z0-9]/.test(value)
        ) {
          error =
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }
        break;
      case "age":
        if (!value.trim()) {
          error = "age is required.";
        } else if (
          value &&
          (isNaN(value) || parseInt(value) < 0 || parseInt(value) > 100)
        ) {
          error = "Age must be a number between 0 and 100.";
        }
        break;
      case "dob":
        if (!value.trim()) {
          error = "date of birth is required.";
        }
        break;
      case "company_name":
        if (!value.trim()) {
          error = "company name is required.";
        }
        break;
      case "profile_pic":
        if (!value) {
          error = "Profile picture is required.";
        } else if (
          value &&
          !["image/jpeg", "image/png", "image/gif"].includes(value.type)
        ) {
          error = "Only JPEG, PNG, or GIF images are allowed.";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;

    setData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    validateField(name, fieldValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Object.values(errors).some((error) => error)) {
        const values = new FormData();
        Object.entries(data).forEach(([key, value]) =>
          values.append(key, value)
        );
        const response = await instance.post("users/signup", values);
        if (response.status === 200) {
          setData(defaultData);
          setErrors({});
          navigate("/signin");
        }
      } else {
        console.log("Form has validation errors");
      }
    } catch (error) {
      navigate(`/error-page?error=${error?.response?.data?.message}`)
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full sm:p-10 lg:p-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.name && "bg-red-50 focus:bg-red-100"
              }`}
              placeholder="Jane Doe"
              value={data.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.email && "bg-red-50 focus:bg-red-100"
              }`}
              placeholder="you@example.com"
              value={data.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.password && "bg-red-50 focus:bg-red-100"
              }`}
              placeholder="********"
              value={data.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.age && "bg-red-50 focus:bg-red-100"
              }`}
              placeholder="e.g., 30"
              value={data.age}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.dob && "bg-red-50 focus:bg-red-100"
              }`}
              value={data.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company_name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.company_name && "bg-red-50 focus:bg-red-100"
              }`}
              placeholder="Your Company Inc."
              value={data.company_name}
              onChange={handleChange}
              required
            />
            {errors.company_name && (
              <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="profile_pic"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Profile Picture *{" "}
              <span className="text-gray-500 text-xs">(JPG/PNG/GIF)</span>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer ${
                             errors.profile_pic && "bg-red-50 focus:bg-red-100"
                           }`}
              accept="image/jpeg, image/png, image/gif"
              onChange={handleChange}
              required
            />
            {errors.profile_pic && (
              <p className="text-red-500 text-xs mt-1">{errors.profile_pic}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 transition duration-300 w-full"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-md text-gray-700">
            Already Registered?{" "}
            <Link
              to="/signin"
              className="font-semibold text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
