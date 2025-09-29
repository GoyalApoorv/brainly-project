import { Logo } from '../icons/Logo';

// Define the props interface
interface HeaderProps {
    onToggleSidebar: () => void;
    isOpen: boolean;
}

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export function Header({ onToggleSidebar, isOpen }: HeaderProps) {
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
            <div>
                {/* Example: <UserProfileIcon /> */}
            </div>
        </header>
    );
}