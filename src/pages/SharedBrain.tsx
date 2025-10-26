import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/ui/Card";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function SharedBrain() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${shareLink}`
        );

        setContents(response.data.content || []);
        setUsername(response.data.username || "Unknown User");
        setLoading(false);

      } catch (error: any) {
        console.error("Error fetching shared brain:", error);
        
        if (error.response?.status === 411) {
          setError("Invalid or expired share link");
        } else {
          setError("Failed to load shared brain");
        }
        setLoading(false);
      }
    }

    if (shareLink) {
      fetchSharedBrain();
    }
  }, [shareLink]);

  function handleDelete(id: string) {
    // Do nothing in public view
  }

  if (loading) {
    return (
      <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a
            href="/"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {username}'s Second Brain
              </h1>
              <p className="text-gray-600 mt-1">
                {contents.length} item{contents.length !== 1 ? 's' : ''} shared
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                 Public View
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {contents.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {contents.map(({ type, link, title, _id }) => (
              <Card
                key={_id}
                type={type}
                link={link}
                title={title}
                id={_id}
                onDelete={handleDelete}
                showScore={false}
                hideDelete={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">
              {username} hasn't shared any content yet
            </p>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">
            Want your own Second Brain?{" "}
            <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              Get Started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}