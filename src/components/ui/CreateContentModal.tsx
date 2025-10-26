import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { TwitterIcon } from "../../icons/TwiiterIcon";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // NEW: Callback to refresh
}

export function ContentModal({ open, onClose, onSuccess }: ContentModalProps) {
  const [type, SetType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();

  async function AddContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please fill in both title and link");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        BACKEND_URL + "/api/v1/content",
        {
          title,
          link,
          type: type
        },
        {
          headers: {
            Authorization:  localStorage.getItem("token") 
          }
        }
      );

      // Close modal
      onClose();
      setStep(1);
      SetType(null);

      // Refresh dashboard immediately
      onSuccess();

    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleTypeSelect(selectedType: string) {
    SetType(selectedType);
    setStep(2);
  }

  function handleCancel() {
    onClose();
    setStep(1);
    SetType(null);
  }

  return (
    <div>
      {open && (
        <>
          <div className="w-screen h-screen bg-slate-500 opacity-60 fixed top-0 left-0 z-[60]"></div>

          <div className="w-screen h-screen fixed flex justify-center top-0 left-0 z-[70]">
            <div className="flex flex-col justify-center">
              {step === 1 && (
                <span className="bg-white rounded opacity-100 p-4">
                  <div className="flex justify-end mb-4">
                    <div onClick={handleCancel} className="cursor-pointer">
                      <CrossIcon />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      <div
                        onClick={() => handleTypeSelect("youtube")}
                        className="cursor-pointer hover:bg-gray-100 flex flex-col items-center p-4 rounded"
                      >
                        <YoutubeIcon size="lg" />
                        Youtube
                      </div>

                      <div
                        onClick={() => handleTypeSelect("twitter")}
                        className="cursor-pointer hover:bg-gray-100 flex flex-col items-center p-4 rounded"
                      >
                        <TwitterIcon size="lg" />
                        Twitter
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={handleCancel} variant="secondary" text="Cancel" size="md" />
                  </div>
                </span>
              )}

              {step === 2 && (
                <span className="bg-white rounded opacity-100 p-4">
                  <div className="flex justify-end">
                    <div onClick={handleCancel} className="cursor-pointer">
                      <CrossIcon />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Input refrence={titleRef} placeholder={"Title"} />
                    <Input refrence={linkRef} placeholder={"Link"} />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={AddContent}
                      variant="secondary"
                      text={loading ? "Adding..." : "Submit"}
                      size="md"
                    />
                  </div>
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}