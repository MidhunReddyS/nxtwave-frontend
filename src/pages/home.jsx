import { useEffect, useState } from "react";
import instance from "../utils/instance";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
        const response = await instance.get(`users/getById`);
        setData(response.data.data);
    }
    catch (error) {
        console.log("error fetching users:", error.message)
        navigate(`/error-page?error=${error?.response?.data?.message}`)
    } finally {
        setLoading(false);
    }
}
  useEffect(() => {
    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
    navigate('/')
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await instance.delete(`users/delete`);
      if (response.status === 200) {
        localStorage.removeItem('token')
        window.location.reload()
        navigate('/');
      }
  }
  catch (error) {
      console.log("error deleting users:", error.message)
      navigate(`/error-page?error=${error?.response?.data?.message}`)
  }
  }

  if (loading) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
          <p className="text-xl text-gray-700">loading...</p>
        </div>
    );
  }

  return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full sm:p-10 lg:p-12">
        <div className="flex flex-col items-center mb-6">
          <img
            src={data.profile_pic || 'https://via.placeholder.com/150/f0f0f0?text=No+Image'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150/f0f0f0?text=Error" }} // Fallback for broken image
          />
          <h2 className="text-4xl font-extrabold text-gray-900 mt-6 mb-2 text-center">
            Welcome, {data.name || 'User'}!
          </h2>
          <p className="text-lg text-gray-600 text-center">
            Glad to have you Back. Here are your details:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
          
          <div className="flex items-center">
            <span className="text-blue-600 mr-3">📧</span>
            <p className="text-gray-800">
              <span className="font-semibold">Email:</span> {data.email}
            </p>
          </div>

          <div className="flex items-center">
            <span className="text-blue-600 mr-3">🎂</span>
            <p className="text-gray-800">
              <span className="font-semibold">Age:</span> {data.age || 'N/A'}
            </p>
          </div>

          <div className="flex items-center">
            <span className="text-blue-600 mr-3">🗓️</span>
            <p className="text-gray-800">
              <span className="font-semibold">DOB:</span> {new Date(data.dob).toLocaleDateString('en-US')}
            </p>
          </div>

          <div className="flex items-center">
            <span className="text-blue-600 mr-3">🏢</span>
            <p className="text-gray-800">
              <span className="font-semibold">Company:</span> {data.company_name || 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-4 gap-4">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75"
          >
            Delete Account
          </button>
        </div>
      </div>
  );
};

export default Home;