import { ReactElement } from "react";
 
 export function SidebarItem({text, icon}: {
    text: String,
    icon: ReactElement;
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded pl-4 mr-2 transition-all duration-150">
    <div className="pr-2">
        {icon}
    </div>
    <div >
        {text}  
    </div>
    </div>
}
