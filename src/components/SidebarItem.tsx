import { ReactElement, FC } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick: () => void;
  active: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({ text, icon, onClick, active }) => {
  return (
    <div
      className={`flex items-center text-md cursor-pointer my-1 p-2 rounded-md transition-colors duration-200 ${
        active ? 'bg-purple-200 text-purple-700' : 'hover:bg-gray-100 text-gray-700'
      }`}
      onClick={onClick}
    >
      <div className="pr-2 text-xl">{icon}</div>
      <div>{text}</div>
    </div>
  );
};