import { useNavigate, useSearchParams } from "react-router-dom";

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full sm:p-10 lg:p-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        An error occurred !
      </h2>
      <p className="text-xl font-semibold text-center text-red-500 mb-8">
        {searchParams.get('error')}
      </p>
      <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
    </div>
  )
}
  
  export default ErrorPage;