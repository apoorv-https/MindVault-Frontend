import { useState } from "react";
import { CrossIcon } from "../../icons/crossicon";
import { Button } from "./Button";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  shareLink: string;
}

export function ShareModal({ open, onClose, shareLink }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 opacity-60 fixed top-0 left-0 z-[60]"></div>

      <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 z-[70]">
        <div className="bg-white rounded-lg opacity-100 p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Share Your Brain</h2>
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Anyone with this link can view your saved content
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
            <p className="text-sm text-gray-800 break-all font-mono">
              {shareLink}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              variant="primary"
              text={copied ? "Copied!" : "Copy Link"}
              size="md"
              fullWidth={true}
            />
            <Button
              onClick={onClose}
              variant="secondary"
              text="Close"
              size="md"
            />
          </div>

          {copied && (
            <p className="text-green-600 text-sm text-center mt-2">
              ✓ Link copied to clipboard!
            </p>
          )}
        </div>
      </div>
    </>
  );
}