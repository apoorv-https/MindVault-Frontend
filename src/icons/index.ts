type SizeStyle="sm" | "md" |"lg"
export interface IconProps{
         
  size?:SizeStyle
  color?:string
  onClick?:()=>void
}

export const  IconStyle:Record<SizeStyle,string>={
    "sm":"size-2",
    "md":"size-4",
    "lg":"size-6"
}

