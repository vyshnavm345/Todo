import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, resetRegistered } from '../features/user';
import { removeSpaces, isEmailValid, isPasswordValid
 } from '../utils/validation';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, isAuthenticated, registered, error, user} = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (registered) dispatch(resetRegistered());
    },  [registered]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: removeSpaces(value) });
    };

    const onSubmit = e =>{
        e.preventDefault();

        if (isEmailValid(email) && isPasswordValid(password)) {
            dispatch(login({ email, password }));
        } else {
        console.error("Invalid email or password");
        }
    }

    useEffect(()=>{
        if (isAuthenticated && user){
            navigate("/")
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-6">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
            <form onSubmit={onSubmit}>
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
                {email.length > 0 && <div className="hidden text-red-500 peer-invalid:block ">
                ! invalid email
                </div>}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                id="password"
                name='password'
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600"
            >
                Log In
            </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
                Register here
            </Link>
            </p>
        </div>
        </div>
    );
};

export default Login;
