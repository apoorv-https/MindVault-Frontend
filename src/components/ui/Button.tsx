import type { ReactElement } from "react";

type Variants = "primary" | "secondary"

export interface ButtonProps {
    variant: Variants;
    text: string;
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

const VariantStyles: Record<Variants, string> = {
    "primary": "bg-purple-200 text-purple-500 hover:bg-purple-300",
    "secondary": "bg-purple-600 text-white hover:bg-purple-700"
} 

const SizeStyle = {
    "sm": "py-1.5 px-2 sm:px-3 text-xs sm:text-sm",
    "md": "py-2 px-3 sm:px-4 text-sm sm:text-base",
    "lg": "py-3 px-4 sm:px-8 text-base sm:text-xl"
}

const defaultStyle = "rounded-md flex font-light items-center justify-center transition-all whitespace-nowrap"

export const Button = (props: ButtonProps) => {
    return (
        <button 
            onClick={props.onClick}  
            className={`
                ${VariantStyles[props.variant]} 
                ${SizeStyle[props.size]} 
                ${defaultStyle} 
                ${props.fullWidth ? "w-full" : ""} 
                ${props.loading || props.disabled ? "opacity-40 cursor-not-allowed" : ""}
            `} 
            disabled={props.loading || props.disabled}
        >
            {props.startIcon ? (
                <div className="pr-1 sm:pr-2 flex-shrink-0">
                    {props.startIcon}
                </div>
            ) : null} 
            <span className="truncate">{props.text}</span>
            {props.endIcon && <div className="pl-1 sm:pl-2 flex-shrink-0">{props.endIcon}</div>}
        </button>
    )
}