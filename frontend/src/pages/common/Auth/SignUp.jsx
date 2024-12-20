import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function SignUp() {
    const url = "http://localhost:5001/api/users"; 
    const navigate = useNavigate(); 
   
    const [user, setUser] = useState({ 
      userName: "", 
      email: "", 
      age: "", 
      password: "", 
    }); 
   
    const handleChange = (e) => { 
      setUser({ ...user, [e.target.id]: e.target.value }); 
    }; 
   
    const handleSubmit = (e) => { 
      e.preventDefault(); 
   
      axios 
        .post(url, user) 
        .then((response) => { 
          console.log(response.data); 
          alert(response.data.msg); 
          navigate("/SignIn"); 
        }) 
        .catch((error) => { 
          alert(error.response.data.msg); 
          console.error("There was an error!", error); 
        }); 
    }; 

  return (
    <div className="min-h-screen py-12 bg-gray-50 flex flex-col justify-center items-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-8 py-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            
              <div>
                <label
                  htmlFor="name"
                  className="block mt-3 text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  value={user.name}
                  type="text"
                  onChange={handleChange}
                  className="dark:bg-gray-50 light:bg-gray-50 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                />
            </div>

            <label
              htmlFor="email"
              className="block mt-3 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              value={user.email}
              onChange={handleChange}
              type="email"
              className="dark:bg-gray-50 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <label
              htmlFor="password"
              className="block mt-3 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              className="bg-gray-50 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6">
            <button
              className="bg-white w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/SignIn")}
            >
                Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
