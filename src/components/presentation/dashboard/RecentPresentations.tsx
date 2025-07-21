"use client";

import { useState } from "react";
import {
  Clock,
  ChevronRight,
  Star,
  Pencil,
  Trash2,
  MoreHorizontal,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePresentationState } from "@/states/presentation-state";
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
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { Presentation } from "@/lib/mock-data";
import { fetchPresentations } from "@/actions/presentation/fetchPresentations";
import { deletePresentation } from "@/actions/presentation/presentationActions";
import { toggleFavorite } from "@/actions/presentation/toggleFavorite";

export function RecentPresentations() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setCurrentPresentation = usePresentationState(
    (state) => state.setCurrentPresentation
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPresentationId, setSelectedPresentationId] = useState<
    string | null
  >(null);
  const [isNavigating, setIsNavigating] = useState<string | null>(null);

  const { data: presentations, isLoading, isError } = useQuery({
    queryKey: ["presentations"],
    queryFn: fetchPresentations,
  });

  const { mutate: deletePresentationMutation } = useMutation({
    mutationFn: async (id: string) => {
      const result = await deletePresentation(id);
      if (!result.success) {
        throw new Error("Failed to delete presentation");
      }
      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["presentations"],
      });
      setDeleteDialogOpen(false);
      toast.success("Presentation deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete presentation:", error);
      toast.error("Failed to delete presentation");
    },
  });

  const { mutate: favoriteMutation } = useMutation({
    mutationFn: async (id: string) => {
      return toggleFavorite(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["presentations"],
      });
      toast.success("Favorite updated successfully");
    },
    onError: () => {
      toast.error("Failed to update favorites");
    },
  });

  const handlePresentationClick = async (presentation: Presentation) => {
    try {
      setIsNavigating(presentation.id);
      setCurrentPresentation(presentation.id, presentation.title);
      navigate(`/presentation/${presentation.id}`);
    } catch (error) {
      console.error("Failed to navigate:", error);
      toast.error("Failed to open presentation");
    } finally {
      setIsNavigating(null);
    }
  };

  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Recent Presentations
            </h2>
          </div>
          <Button
            variant="ghost"
            disabled
            className="gap-2 text-primary hover:text-primary/80"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative aspect-video">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!presentations || presentations.length === 0) return null;

  const handleDelete = (id: string) => {
    setSelectedPresentationId(id);
    setDeleteDialogOpen(true);
  };

  const handleFavorite = (id: string) => {
    favoriteMutation(id);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Recent Presentations
          </h2>
        </div>
        <Button
          variant="outline"
          className="gap-2 text-primary hover:bg-primary/5 hover:text-primary"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {presentations.slice(0, 3).map((presentation) => (
          <Card
            key={presentation.id}
            className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div
              className="relative aspect-video bg-muted cursor-pointer"
              onClick={() => handlePresentationClick(presentation)}
            >
              <div className="flex h-full w-full items-center justify-center bg-primary/10">
                <Clock
                  className={cn(
                    "h-12 w-12 transition-all",
                    isNavigating === presentation.id
                      ? "animate-spin text-primary"
                      : "text-primary/50"
                  )}
                />
              </div>
            </div>
            <CardContent className="p-0">
              <div
                className="flex flex-col space-y-2 p-4 cursor-pointer"
                onClick={() => handlePresentationClick(presentation)}
              >
                <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                  {isNavigating === presentation.id
                    ? "Loading..."
                    : presentation.title || "Untitled Presentation"}
                </h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  {isNavigating === presentation.id
                    ? "Loading..."
                    : formatDate(presentation.updatedAt)}
                </div>
              </div>
            </CardContent>
            <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => handleFavorite(presentation.id)}
                    className="cursor-pointer"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    {presentation.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(presentation.id)}
                    className="cursor-pointer text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              presentation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedPresentationId &&
                deletePresentationMutation(selectedPresentationId)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}