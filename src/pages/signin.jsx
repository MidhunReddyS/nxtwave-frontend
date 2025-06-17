import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/instance";
import { useState } from "react";

const defaultData = {
  email: "",
  password: "",
};

const Signin = () => {
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
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
        }
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
          const response = await instance.post("users/login", data);
          if (response.status === 200) {
            navigate(`/verify?email=${data.email}`);
            setData(defaultData);
            setErrors({});
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
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full sm:p-10 lg:p-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-10">
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
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="#"
            className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-blue-500 hover:text-blue-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
