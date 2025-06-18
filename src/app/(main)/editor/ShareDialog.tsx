"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareResume({ resumeId }: { resumeId: string }) {
  const [open, setOpen] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/preview/${resumeId}`
      : "";

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out my resume!",
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your resume</DialogTitle>
          <DialogDescription>
            Copy or share your resume with anyone using the options below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-2">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast.success("Link copied!");
            }}
          >
            Copy Link
          </Button>

          <Button variant="default" size="sm" onClick={handleShare}>
            System Share (if supported)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
