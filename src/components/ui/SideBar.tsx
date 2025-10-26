import { Logo } from "../../icons/Logo"
import { TwitterIcon } from "../../icons/TwiiterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { SidebarElement } from "./SidebarElements"
import { Bar } from "../../icons/bar"

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onFilterChange?: (type: string | null) => void;
  activeFilter?: string | null;
}

export const SideBar = ({ isOpen, setIsOpen, onFilterChange, activeFilter }: SideBarProps) => {
  
  const handleFilterChange = (type: string | null) => {
    if (onFilterChange) {
      onFilterChange(type);
    }
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`bg-white fixed top-0 left-0 h-screen shadow-lg z-50 transition-all duration-500 ease-in-out
          ${isOpen ? 'w-72' : 'w-0 lg:w-16'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header with Logo and Toggle */}
        <div className={`flex items-center pt-4 pb-4 ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
          {isOpen && (
            <div className="text-xl sm:text-2xl flex items-center transition-opacity duration-300">
              <div className="pr-2">
                <Logo/>
              </div>
              <span className="font-semibold">Mind Vault</span>
            </div>
          )}

          <div className="cursor-pointer flex-shrink-0" onClick={() => setIsOpen(!isOpen)}>
            <Bar size="lg"/>
          </div>
        </div>

        {/* Sidebar Elements - shown when open */}
        {isOpen && (
          <div className="pt-2 px-4 transition-opacity duration-300">
            <SidebarElement 
              text="All" 
              Icon={<Logo/>} 
              onClick={() => handleFilterChange(null)}
              isActive={activeFilter === null}
            />
            <SidebarElement 
              text="Twitter" 
              Icon={<TwitterIcon/>}
              onClick={() => handleFilterChange('twitter')}
              isActive={activeFilter === 'twitter'}
            />
            <SidebarElement 
              text="Youtube" 
              Icon={<YoutubeIcon/>}
              onClick={() => handleFilterChange('youtube')}
              isActive={activeFilter === 'youtube'}
            />
          </div>
        )}

        {/* Icons only - shown when closed (desktop only) */}
        {!isOpen && (
          <div className="hidden lg:flex flex-col items-center pt-8 gap-4">
            <div 
              className="cursor-pointer"
              onClick={() => handleFilterChange(null)}
            >
              <Logo/>
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => handleFilterChange('twitter')}
            >
              <TwitterIcon/>
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => handleFilterChange('youtube')}
            >
              <YoutubeIcon/>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Button - Fixed on mobile screens */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-30 lg:hidden bg-white p-2 rounded-md shadow-md"
        >
          <Bar size="lg"/>
        </button>
      )}
    </>
  )
}