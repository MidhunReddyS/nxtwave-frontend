import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import instance, { updatedToken } from "../utils/instance";

const defaultData = {
    otp: '',
  };

const Verify = () => {
    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const validateField = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
          case "otp":
            if (!value.trim()) {
              error = "otp is required.";
            }else if (
                value &&
                (isNaN(value) || value.length < 6 || value.length > 6)
              ) {
                error = "otp must be a 6 digits.";
              }
              
              break;
            }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
        return error === "";
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
          ...prev,
          [name]: value,
        }));
        validateField(name, value);
      };

    const handleSubmit = async (e) => {
          e.preventDefault();
          const email = searchParams.get('email')
          Object.values(data).forEach(value => validateField(value, data[value]))
          try {
            if (!Object.values(errors).some((error) => error)) {
              const response = await instance.post("users/verify", {...data, email});
              if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                updatedToken(response.data.token)
                setData(defaultData);
                setErrors({});
                navigate(`/`);
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
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Verify
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="OTP"
              className="block text-gray-700 text-md mb-2"
            >
              OTP *
            </label>
            <input
              type="number"
              id="otp"
              name="otp"
              className={`shadow-sm appearance-none rounded-lg w-full py-3 px-4 bg-blue-100 text-black-700 leading-tight focus:bg-blue-200 focus:outline-none transition duration-200 ${
                errors.otp && "bg-red-50 focus:bg-red-100"
              }`}
              placeholder=""
              value={data.otp}
              onChange={handleChange}
              required
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            >
              Verify
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Wrong account?{" "}
              <Link
                to={'/signin'}
                className="font-medium text-blue-500 hover:text-blue-800"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    )
}
  
export default Verify;