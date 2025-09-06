
import { User } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { getCurrentUser, updateCurrentUser } from './authService';

// In a real app, these would be API calls. Here we simulate with localStorage and mock data.

export const updateUserProfile = async (userId: string, profileData: { name: string; email: string }): Promise<User | null> => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.id !== userId) {
        console.error("Unauthorized profile update attempt.");
        return null;
    }

    // In a real app, you would send this to the backend.
    // Here, we update the user object and save it back to localStorage.
    const updatedUser: User = {
        ...currentUser,
        name: profileData.name,
        email: profileData.email,
    };
    
    // Also update the mock user array for consistency if the app were to reload it
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if(userIndex !== -1) {
        // This won't persist across reloads as MOCK_USERS is a constant, but good for in-session consistency.
        // A real app would rely on the backend as the source of truth.
    }

    updateCurrentUser(updatedUser);

    return updatedUser;
};
