
import React, { useState } from 'react';
import { User } from '../types';
import { updateUserProfile } from '../services/userService';

interface ProfilePageProps {
    user: User;
    onProfileUpdate: (updatedUser: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onProfileUpdate }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const isFormValid = name && email;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const updatedUser = await updateUserProfile(user.id, { name, email });
            if (updatedUser) {
                onProfileUpdate(updatedUser);
                setSuccess('Profile updated successfully!');
            } else {
                setError('Failed to update profile. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Update your personal information.
                </p>
            </header>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="block w-full bg-white border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="block w-full bg-white border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            type="text"
                            value={user.role}
                            className="block w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    <div className="pt-4 border-t flex items-center justify-end gap-4">
                         {success && <p className="text-sm text-green-600">{success}</p>}
                         {error && <p className="text-sm text-red-600">{error}</p>}
                        <button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
