import { FC, ReactElement } from "react";

type Variant = 'primary' | 'secondary';

interface ButtonProps {
    title: string;
    variant: Variant;
    onClick?: () => void;
    size: "sm" | "md" | "lg" | "tag" | "contentSubmit";
    startIcon?: ReactElement;
    fullWidth?: boolean;
    disabled?: boolean 
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
};

const sizeStyles = {
    "sm": "px-2 py-1 text-sm rounded-md",
    "md": "px-4 py-2 text-md rounded-lg",
    "lg": "px-8 py-4 text-xl rounded-xl",
    "tag": "px-1.5 py-1 text-xs",
    "contentSubmit": "py-1.5 px-6 text-sm"
};

const defaultStyles = "rounded-md";

const Button: FC<ButtonProps> = (props) => {
    return (
        <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={props.onClick} disabled={props.disabled}>
            <div className="flex items-center justify-center">
                <span>
                    {props.startIcon}
                </span>
                <div className="pl-1">
                    {props.title}
                </div >
            </div>
        </button>
    );
};

export default Button;