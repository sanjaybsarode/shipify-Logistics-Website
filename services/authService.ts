
import { User } from '../types';
import { MOCK_USERS } from '../data/mockData';

const USER_STORAGE_KEY = 'shipify_current_user';

export const login = (email: string, password: string): User | null => {
    // This is a mock login. In a real app, you'd hash the password and check against a database.
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
        return null;
    }

    // Check password: specific for the new admin, generic for others.
    const isPasswordCorrect =
        (user.email === 'sanjaybsarode@gmail.com' && password === '13021978@s') ||
        (user.email !== 'sanjaybsarode@gmail.com' && password === 'password');

    if (isPasswordCorrect) {
        try {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } catch (error) {
            console.error("Failed to save user to localStorage", error);
        }
        return user;
    }

    return null;
};

export const logout = (): void => {
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to remove user from localStorage", error);
    }
};

export const getCurrentUser = (): User | null => {
    try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            return JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Failed to parse current user from localStorage", error);
    }
    return null;
};

export const updateCurrentUser = (user: User): void => {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
        console.error("Failed to update user in localStorage", error);
    }
};