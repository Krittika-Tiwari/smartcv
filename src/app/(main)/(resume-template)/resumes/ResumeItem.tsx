"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeServerData } from "@/lib/type";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Share, Trash } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteResume } from "./action";
import LoadingButton from "@/components/LoadingButton";
import { useReactToPrint } from "react-to-print";
import ShareResume from "../../editor/ShareDialog";
import { useRouter } from "next/navigation";

interface ResumeItemProps {
  resume: ResumeServerData;
}
export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // 👈 Add this

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
      <div className="space-y-3">
        <div
          onClick={() => router.push(`/editor?resumeId=${resume.id}`)}
          className="inline-block w-full text-center cursor-pointer"
        >
          <p className="font-semibold line-clamp-1">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.createdAt, "MMM d, yyyy hh:mm a")}
          </p>
        </div>
        <div
          onClick={() => router.push(`/editor?resumeId=${resume.id}`)}
          className="relative inline-block w-full cursor-pointer"
        >
          <ResumePreview
            contentRef={contentRef}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={handlePrint} />
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}
function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConformationModal, setShowDeleteConformationModal] =
    useState(false);
  const [showShareResumeModal, setShowShareResumeModal] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConformationModal(true)}
          >
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowShareResumeModal(true)}
          >
            <Share className="size-4" />
            Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteResumeModal
        resumeId={resumeId}
        open={showDeleteConformationModal}
        onOpenChange={setShowDeleteConformationModal}
      />
      <ShareResume
        resumeId={resumeId}
        open={showShareResumeModal}
        setOpen={setShowShareResumeModal}
      />
    </>
  );
}

interface DeleteResumeModalProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteResumeModal({
  resumeId,
  open,
  onOpenChange,
}: DeleteResumeModalProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast.error(" Something went wrong. Please try again");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
