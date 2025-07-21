"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  EllipsisVertical,
  Star,
  Trash2,
  Pencil,
  Presentation as PresentationIcon,
  Copy,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Presentation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { usePresentationState } from "@/states/presentation-state";
import { deletePresentation } from "@/actions/presentation/presentationActions";
import { toggleFavorite } from "@/actions/presentation/toggleFavorite";

interface PresentationItemProps {
  presentation: Presentation;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export default function PresentationItem({
  presentation,
  onEdit,
  onDelete,
  className,
}: PresentationItemProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(presentation.title);
  const queryClient = useQueryClient();
  const { setCurrentPresentation } = usePresentationState();

  const deleteMutation = useMutation({
    mutationFn: deletePresentation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      onDelete?.(presentation.id);
      toast.success("Presentation deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete presentation");
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () => toggleFavorite(presentation.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      toast.success(
        presentation.isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    },
    onError: () => {
      toast.error("Failed to update favorite status");
    },
  });

  const handleView = () => {
    setCurrentPresentation(presentation.id, presentation.title);
    navigate(`/presentation/${presentation.id}`);
  };

  const handleEdit = () => {
    setCurrentPresentation(presentation.id, presentation.title);
    navigate(`/presentation/generate/${presentation.id}`);
  };

  const handleDelete = () => {
    deleteMutation.mutate(presentation.id);
    setShowDeleteDialog(false);
  };

  const handleFavorite = () => {
    favoriteMutation.mutate();
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0" onClick={handleView}>
            <div className="flex items-center gap-2 mb-2">
              <PresentationIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <h3 className="text-sm font-medium truncate">{presentation.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(presentation.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <PresentationIcon className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFavorite}>
                <Star
                  className={cn(
                    "mr-2 h-4 w-4",
                    presentation.isFavorite && "fill-current text-yellow-500"
                  )}
                />
                {presentation.isFavorite ? "Remove from favorites" : "Add to favorites"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {presentation.isFavorite && (
          <Star className="absolute top-2 right-2 h-4 w-4 fill-current text-yellow-500" />
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Presentation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{presentation.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}