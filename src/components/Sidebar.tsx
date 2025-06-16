import { SidebarItem } from "./SidebarItem";
import {TwitterIcon} from '../icons/TwitterIcon'
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "../icons/Logo";
import { DocIcon } from "../icons/DocIcon";


export function Sidebar() {
    return <div className="h-screen bg-white top-0 left-0 border-r w-72 fixed pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-700">
                <a href="/Dashboard" className="cursor-pointer">                <Logo /></a>
            </div>
           <a className="cursor-pointer" href="/dashboard"> Brainly</a>
        </div>
        <div className="pt-4 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
            <SidebarItem text="Youtube" icon={<YouTubeIcon />} />
            <SidebarItem text="Document" icon={<DocIcon />} />
        </div>
    </div>
}