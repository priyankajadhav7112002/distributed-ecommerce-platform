import React, { useState } from 'react';
import { loginUser } from '../../services/authApi'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";

export const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await loginUser(formData);


            const decoded = jwtDecode(response.token);

            localStorage.setItem("role", decoded.role);

            login(response.token);

            navigate('/dashboard');
        } catch (error) {

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            alert(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>

            <div className='bg-white p-8 rounded-xl shadow-lg w-96'>

                <h2 className='text-3xl font-bold mb-6 text-center'>
                    Ecommerce Login
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='w-full border p-3 mb-4 rounded'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='w-full border p-3 mb-4 rounded'
                        onChange={handleChange}
                    />

                    <button className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700'>
                        Login
                    </button>

                    <p className="mt-4 text-center">

                        Don't have an account?

                        <span
                            className="text-blue-600 cursor-pointer ml-1"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>

                    </p>


                </form>
            </div>
        </div>
    );
};
