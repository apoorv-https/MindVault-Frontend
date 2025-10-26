import { Button } from "../components/ui/Button"
import '../App.css'
import { PlusIcon } from "../icons/plusicon"
import { ShareIcon } from "../icons/shareIcon"
import { Card } from "../components/ui/Card"
import { ContentModal } from "../components/ui/CreateContentModal"
import { ShareModal } from "../components/ui/ShareModal"
import { useEffect, useState } from "react"
import { SideBar } from "../components/ui/SideBar"
import { useContent } from "../hooks/useContent"
import { Search } from "../components/ui/Search"
import axios from "axios"
import { BACKEND_URL } from "../config"

export function Dashboard() {
  const [isSidebarOpen, SetSidebar] = useState(false) // mobile closed by default
  const [Modalopen, SetModal] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  
  const { 
    contents, 
    refresh, 
    SetContent,
    searchContent,
    clearSearch,
    isSearchMode,
    searchQuery,
    allContents
  } = useContent()

  useEffect(() => {
    refresh()
  }, [Modalopen])

  async function share() {
    try {
      const response = await axios.post(
        BACKEND_URL + '/api/v1/brain/share',
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      const hash = response.data.hash
      const fullLink = `${window.location.origin}/brain/${hash}`
      setShareLink(fullLink)
      setShareModalOpen(true)
    } catch (error) {
      console.error("Error sharing:", error)
      alert("Failed to generate share link")
    }
  }

  const handleDelete = (id: string) => {
    SetContent(contents.filter(item => item._id !== id))
  }

  const handleFilterChange = (type: string | null) => {
    setActiveFilter(type)
    if (type === null) SetContent(allContents)
    else SetContent(allContents.filter(item => item.type === type))
  }

  const displayedContents = activeFilter 
    ? contents.filter(item => item.type === activeFilter)
    : contents

  return (
    <div className="min-h-screen bg-gray-100">
      <SideBar isOpen={isSidebarOpen} setIsOpen={SetSidebar} onFilterChange={handleFilterChange} activeFilter={activeFilter} />

      <div className={`transition-all duration-500 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-16'} ml-0`}>
        <ContentModal open={Modalopen} onClose={() => SetModal(false)} onSuccess={() => refresh()} />
        <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} shareLink={shareLink} />

        {/* Top Controls */}
        <div className="p-3 sm:p-4">
          <div className="flex flex-col gap-3">
            {/* Mobile buttons */}
            <div className="flex items-center justify-end gap-2 lg:hidden">
              <Button onClick={share} startIcon={<ShareIcon size="md" />} variant="primary" size="sm" text="Share" />
              <Button onClick={() => SetModal(true)} startIcon={<PlusIcon size="md" />} variant="secondary" size="sm" text="Add" />
            </div>

            {/* Search + Desktop buttons */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
              {/* Search */}
              <div className="w-full lg:flex-1 lg:flex lg:justify-center">
                <div className="w-full lg:max-w-xl">
                  <Search onSearch={searchContent} onClear={clearSearch} />
                </div>
              </div>

              {/* Desktop buttons */}
              <div className="hidden lg:flex items-center gap-2">
                <Button onClick={share} startIcon={<ShareIcon size="md" />} variant="primary" size="sm" text="Share Mind" />
                <Button onClick={() => SetModal(true)} startIcon={<PlusIcon size="md" />} variant="secondary" size="sm" text="Add Content" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Banner */}
        {isSearchMode && (
          <div className="mx-3 sm:mx-4 mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-purple-900 font-medium text-sm sm:text-base block sm:inline">🔍 "{searchQuery}"</span>
                <span className="text-purple-700 text-xs sm:text-sm block sm:inline sm:ml-2">({contents.length} result{contents.length !== 1 ? 's' : ''})</span>
              </div>
              <button onClick={clearSearch} className="text-purple-600 hover:text-purple-800 text-xs sm:text-sm font-medium underline text-left sm:text-right">Show all</button>
            </div>
          </div>
        )}

        {/* Filter Banner */}
        {activeFilter && !isSearchMode && (
          <div className="mx-3 sm:mx-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-blue-900 font-medium">Showing {activeFilter} content</span>
              <span className="ml-2 text-blue-700 text-sm">({displayedContents.length} item{displayedContents.length !== 1 ? 's' : ''})</span>
            </div>
            <button onClick={() => handleFilterChange(null)} className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">Show all content</button>
          </div>
        )}

        {/* Content Grid */}
        <div className="px-3 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedContents.length > 0 ? (
            displayedContents.map(({ type, link, title, _id, score }) => (
              <Card key={_id} type={type} link={link} title={title} id={_id} onDelete={handleDelete} score={score} showScore={isSearchMode} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-600">
              {isSearchMode ? `No results for "${searchQuery}"` : activeFilter ? `No ${activeFilter} content yet` : "No content yet"}
              {(isSearchMode || activeFilter) && (
                <button onClick={() => { if(isSearchMode) clearSearch(); if(activeFilter) handleFilterChange(null)}} className="text-purple-600 hover:text-purple-800 font-medium ml-2">Show all</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
