import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"

export const useContent = () => {
  const [contents, SetContent] = useState([])
  const [allContents, SetAllContents] = useState([])
  const [isSearchMode, SetIsSearchMode] = useState(false)
  const [searchQuery, SetSearchQuery] = useState("")

  function refresh() {
    axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
      const fetchedContent = response.data.content || response.data.contents || []
      SetAllContents(fetchedContent)
      
      if (!isSearchMode) {
        SetContent(fetchedContent)
      }
    }).catch((error) => {
      console.error("Failed to fetch content:", error)
    })
  }

  async function searchContent(query: string, threshold: number = 0.75) {
    try {
      
      
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/search?q=${encodeURIComponent(query)}&threshold=${threshold}`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      
      
      
      SetContent(response.data.results || [])
      SetIsSearchMode(true)
      SetSearchQuery(query)
    } catch (error) {
      console.error(" Search failed:", error)
      alert("Search failed. Please try again.")
    }
  }

  function clearSearch() {
    SetContent(allContents)
    SetIsSearchMode(false)
    SetSearchQuery("")
  }

  useEffect(() => {
    refresh()
    
    let interval = setInterval(() => {
      if (!isSearchMode) {
        refresh()
      }
    }, 10 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isSearchMode])

  return { 
    contents, 
    refresh, 
    SetContent,
    searchContent,
    clearSearch,
    isSearchMode,
    searchQuery,
    allContents 
  }
}