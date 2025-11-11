import { Logo } from '../icons/Logo';
import Button from './Button';
import { useState } from 'react';


interface User {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
}

// Define the props interface
interface HeaderProps {
    onToggleSidebar: () => void;
    isOpen: boolean;
    user: User | null;
    onSignOut: () => void;
}

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export function Header({ onToggleSidebar, isOpen, user, onSignOut }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userInitial = user?.username?.[0]?.toUpperCase() || 'U';

    return (
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center justify-between">
            {/* Left Section: Toggle Button */}
            <button onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-gray-200">
                <HamburgerIcon />
            </button>

            {/* Center Section: Conditionally rendered Logo and Title */}
            {!isOpen && (
                <div className="flex items-center text-2xl absolute left-1/2 -translate-x-1/2">
                    <div className="pr-2 text-purple-700">
                        <Logo />
                    </div>
                    <span>Brainly</span>
                </div>
            )}

            {/* Right Section: Placeholder for user icon, etc. */}
            <div className="relative">
                {/* The Profile "Bubble" Button */}
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Small delay to allow clicking links
                    className="rounded-full h-10 w-10 bg-purple-600 text-white flex justify-center items-center font-bold text-lg hover:bg-purple-700 focus:outline-none"
                >
                    {userInitial}
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                        <div className="px-4 py-3">
                            <p className="text-sm text-gray-900 font-semibold">
                                Hello, {user?.firstName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user?.username}
                            </p>
                        </div>
                        <div className="border-t border-gray-100 p-1">
                            <Button
                                onClick={onSignOut}
                                variant="secondary"
                                title="Sign Out"
                                size="md"
                            />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}