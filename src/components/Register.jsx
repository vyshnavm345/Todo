import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { doPasswordsMatch, isEmailValid, isPasswordValid, removeSpaces } from '../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/user';
const Register = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        password2: "",
    });
    const { fullname, email, password, password2 } = formData;

    const {registered, loading, error, isAuthenticated} = useSelector(state=>state.user);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: removeSpaces(value) });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
        isEmailValid(email) &&
        isPasswordValid(password) &&
        doPasswordsMatch(password, password2)
        ) {
            dispatch(register({fullname, email, password}))
        } else {
        console.log("Invalid input");
        }
    };

    if (registered) return <Navigate to='/login' />;

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Implement your registration logic here
    //     console.log('Registering with:', name, email, password);
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-6">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
                </label>
                <input
                type="text"
                id="name"
                name="fullname"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter your name"
                value={fullname}
                onChange={onChange}
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
                required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                name="password2"
                id="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Re-enter Password"
                value={password2}
                onChange={onChange}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600"
            >
                Register
            </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Log In here
            </Link>
            </p>
        </div>
        </div>
    );
};

export default Register;
