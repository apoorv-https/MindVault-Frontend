// SidebarElements.tsx
interface SidebarElementProps {
  text: string;
  Icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const SidebarElement = ({ text, Icon, onClick, isActive }: SidebarElementProps) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors ${
        isActive 
          ? 'bg-purple-100 text-purple-700' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <div className="pr-3">
        {Icon}
      </div>
      <div className="font-medium">
        {text}
      </div>
    </div>
  )
}