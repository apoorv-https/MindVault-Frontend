import { type ReactElement, useEffect } from "react";
import { DeleteIcon } from "../../icons/deleteicon";
import { ShareIcon } from "../../icons/shareIcon";
import { TwitterIcon } from "../../icons/TwiiterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface Card_props {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  id: string;
  onDelete: (id: string) => void;
  score?: number;
  showScore?: boolean;
  hideDelete?: boolean;
}

const icon_logo: Record<string, ReactElement> = {
  "twitter": <TwitterIcon />,
  "youtube": <YoutubeIcon />
}

export const Card = (props: Card_props) => {

  useEffect(() => {
    if (props.type === "twitter") {
      if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        if (window.twttr?.widgets) {
          window.twttr.widgets.load();
        }
      }
    }
  }, [props.type]);

  async function DeleteContent() {
    props.onDelete(props.id);
    
    try {
      await axios.delete(BACKEND_URL + '/api/v1/content', {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          content_id: props.id
        }
      });
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }
  
  return (
    <div className="rounded-md border-gray-200 border w-full p-3 sm:p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex items-center flex-1 min-w-0">
          <div className="pr-2 text-gray-500 flex-shrink-0">
            {icon_logo[props.type]}
          </div>
          <span className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">
            {props.title}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {props.showScore && props.score && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-700 text-[10px] sm:text-xs font-semibold rounded whitespace-nowrap">
              {(props.score * 100).toFixed(0)}%
            </span>
          )}

          <a 
            href={props.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <ShareIcon size="md" />
          </a>

          {!props.hideDelete && (
            <button 
              onClick={DeleteContent}
              className="text-gray-500 hover:text-red-600 p-1"
            >
              <DeleteIcon size="md" />
            </button>
          )}
        </div>
      </div>

      {/* Content Preview */}
      <div className="w-full">
        {props.type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={props.link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {props.type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};