
import { useState } from "react";
import { MessageCircle, Reply, Heart, MoreHorizontal, Flag, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
  slideNumber?: number;
}

interface PresentationCommentsProps {
  presentationId: string;
}

export function PresentationComments({ presentationId }: PresentationCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "",
        initials: "SJ"
      },
      content: "Great presentation! The data visualization on slide 5 was particularly impressive.",
      timestamp: new Date("2024-01-15T10:30:00"),
      likes: 12,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Mike Chen",
            avatar: "",
            initials: "MC"
          },
          content: "I agree! The charts were very clear and easy to understand.",
          timestamp: new Date("2024-01-15T11:00:00"),
          likes: 3,
          replies: [],
          isLiked: false
        }
      ],
      isLiked: false,
      slideNumber: 5
    },
    {
      id: "2",
      user: {
        name: "Alex Rodriguez",
        avatar: "",
        initials: "AR"
      },
      content: "Could you share the source data for the market analysis section?",
      timestamp: new Date("2024-01-15T14:20:00"),
      likes: 8,
      replies: [],
      isLiked: true,
      slideNumber: 8
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "",
        initials: "YO"
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      user: {
        name: "You",
        avatar: "",
        initials: "YO"
      },
      content: replyText,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    setReplyText("");
    setReplyingTo(null);
  };

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply =>
            reply.id === commentId
              ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
              : reply
          )
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`flex gap-3 ${isReply ? "ml-8 mt-3" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.user.avatar} />
        <AvatarFallback>{comment.user.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{comment.user.name}</span>
          <span className="text-xs text-muted-foreground">{formatTimeAgo(comment.timestamp)}</span>
          {comment.slideNumber && (
            <Badge variant="outline" className="text-xs">
              Slide {comment.slideNumber}
            </Badge>
          )}
        </div>
        <p className="text-sm">{comment.content}</p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLike(comment.id, isReply, parentId)}
            className={`h-8 gap-1 ${comment.isLiked ? "text-red-500" : ""}`}
          >
            <Heart className={`h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`} />
            {comment.likes}
          </Button>
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(comment.id)}
              className="h-8 gap-1"
            >
              <Reply className="h-3 w-3" />
              Reply
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {replyingTo === comment.id && (
          <div className="mt-3 space-y-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[60px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Comment */}
        <div className="space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
