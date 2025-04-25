import { FC, ReactElement } from "react";

type Variant = 'primary' | 'secondary';

interface ButtonProps {
    title: string;
    variant: Variant;
    onClick?: () => void
    size: "sm" | "md" | "lg"; 
    startIcon?: ReactElement
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const sizeStyles = {
    "sm": "px-2 py-1 text-sm rounded-md",
    "md": "px-4 py-2 text-md rounded-lg",
    "lg": "px-8 py-4 text-xl rounded-xl"
}   

const defaultStyles = "px-4 py-2 rounded-md "

const Button: FC<ButtonProps> = (props) => {
    return ( 
    <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} onClick={props.onClick}>
        <div className="flex items-center">
            <span>
              {props.startIcon}
            </span>
            <div className="px-2">
            {props.title} 
            </div >
        </div>
    </button>
    )
}

export default Button;
