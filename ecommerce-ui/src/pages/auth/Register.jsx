import { useState } from "react";
import { registerUser } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "USER"
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

            await registerUser(formData);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error);
            alert("Registration Failed");

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full border p-3 rounded mb-4"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded mb-4"
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        className="w-full border p-3 rounded mb-4"
                        onChange={handleChange}
                    >

                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>

                    </select>

                    <button
                        className="w-full bg-green-600 text-white p-3 rounded"
                    >
                        Register
                    </button>

                    

                </form>

            </div>

        </div>
    );
}

export default Register;