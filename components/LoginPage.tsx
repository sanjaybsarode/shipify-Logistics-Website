

import React, { useState } from 'react';
import { login } from '../services/authService';
import { User } from '../types';
import Logo from './icons/Logo';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = login(email, password);
        if (user) {
            onLogin(user);
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-full">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Logo className="mx-auto h-12 w-auto text-gray-800" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Customer Portal Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Access your dashboard to manage logistics.
                    </p>
                </div>
                
                <div className="bg-white p-10 rounded-xl shadow-lg border">
                    <form className="mt-2 space-y-6" onSubmit={handleFormSubmit}>
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;