import { TwitterIcon } from '../icons/TwitterIcon';
import { YouTubeIcon } from '../icons/YoutubeIcon';
import { Logo } from '../icons/Logo';
import { DocIcon } from '../icons/DocIcon';
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
    isOpen: boolean;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export function Sidebar({ isOpen, onFilterChange, activeFilter }: SidebarProps) {
    return (
        <div className={`h-screen bg-white top-0 left-0 border-r w-72 fixed pl-6 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-700">
                    <a href="/Dashboard" className="cursor-pointer">
                        <Logo />
                    </a>
                </div>
                <a className="cursor-pointer" href="/dashboard"> Brainly</a>
            </div>
            <div className="pt-4 pl-4">
                <SidebarItem 
                    text="All" 
                    icon={<Logo />} 
                    onClick={() => onFilterChange('all')}
                    active={activeFilter === 'all'}
                />
                <SidebarItem 
                    text="Tweets"
                    icon={<TwitterIcon />} 
                    onClick={() => onFilterChange('tweet')}
                    active={activeFilter === 'tweet'}
                />
                <SidebarItem 
                    text="Youtube" 
                    icon={<YouTubeIcon />} 
                    onClick={() => onFilterChange('youtube')}
                    active={activeFilter === 'youtube'}
                />
                <SidebarItem 
                    text="Document" 
                    icon={<DocIcon />} 
                    onClick={() => onFilterChange('document')}
                    active={activeFilter === 'document'}
                />
            </div>
        </div>
    );
}