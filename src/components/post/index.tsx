import { useState, useEffect } from "react";
import {
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  MoreHorizontal,
  User as UserIcon,
} from "lucide-react";
import { useThemeStore } from "../../store";
import { User } from "firebase/auth";
import { usePosts } from "../../hooks/useFireBaseWriteNoti";
import UserImage from "../common/UserImage";

interface IPostProps {
  isUser?: User | null;
  isLoading?: boolean;
  isCreateTime?: string;
  isTitle?: string;
  postMessage?: string;
  isUserImage?: {
    imageFile?: string | null | undefined;
  };
  user?: User | null;
  photoURL?: string;
  likes?: number;
  showAllPosts?: boolean;
}

const Post = ({ isUser, showAllPosts = false }: IPostProps) => {
  const {
    posts,
    likeStatuses,
    toggleLike,
    deletePost,
    bookmarkStatuses,
    toggleBookmark,
    comments,
    commentContent,
    setCommentContent,
    addComment,
  } = usePosts();
  const { isDarkMode } = useThemeStore();
  const [dropdownPostId, setDropdownPostId] = useState<string | null>(null);

  // 필터링 로직
  const filteredPosts = showAllPosts
    ? posts
    : posts.filter((post) => post.authorId === isUser?.uid);

  // 정렬 로직
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const isABookmarked = bookmarkStatuses[a.id] || false;
    const isBBookmarked = bookmarkStatuses[b.id] || false;

    if (isABookmarked && !isBBookmarked) return -1;
    if (!isABookmarked && isBBookmarked) return 1;

    return b.createdAt?.seconds - a.createdAt?.seconds;
  });

  const handleLike = async (postId: string) => {
    if (!isUser || toggleLike.isPending) return;
    await toggleLike.mutateAsync({ postId });
  };

  // 북마크 처리
  const handleBookmark = async (postId: string) => {
    if (!isUser || toggleBookmark.isPending) return;
    await toggleBookmark.mutateAsync({ postId });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleMoreClick = (postId: string) => {
    setDropdownPostId(dropdownPostId === postId ? null : postId);
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      await deletePost.mutateAsync(postId);
      setDropdownPostId(null);
    }
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!commentContent.trim()) return;
    await addComment.mutateAsync({ postId, content: commentContent });
  };

  return (
    <div className="space-y-6">
      {sortedPosts.length === 0 ? (
        <p className="text-center text-gray-500">작성된 게시물이 없습니다.</p>
      ) : (
        sortedPosts.map((post) => (
          <div
            key={post.id}
            className={`${
              isDarkMode
                ? "bg-gray-800 bg-opacity-50"
                : "bg-purple-300 bg-opacity-50"
            } rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70`}
          >
            <div className="p-4 flex items-center">
              <UserImage userId={post.authorId} size="md" />
              <div>
                <span className="font-semibold">{post.authorName}</span>
                <p className="text-xs text-gray-400">
                  {formatDate(post.createdAt)}
                </p>
              </div>
              <div className="ml-auto relative">
                <button
                  onClick={() => handleMoreClick(post.id)}
                  className="focus:outline-none"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
                {dropdownPostId === post.id &&
                  post.authorId === isUser?.uid && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          게시물 삭제하기
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-4 font-semibold text-[1.25rem]">
                {post.title}
              </h3>
              <p className="mb-4">{post.content}</p>
              {post.postImage && (
                <div className="mb-4">
                  <img
                    src={post.postImage}
                    alt="Post content"
                    className="w-full rounded-lg object-cover max-h-96"
                    onError={(e) => {
                      console.error("Image load error:", e);
                      e.currentTarget.src = "/default-post-image.png";
                    }}
                  />
                </div>
              )}
              <div className="flex justify-between mb-2">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 focus:outline-none group"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likeStatuses[post.id]
                          ? "text-red-500 fill-current"
                          : "group-hover:text-red-500 transition-colors"
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 focus:outline-none group">
                    <MessageCircle className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 focus:outline-none group">
                    <Share2 className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                    <span>{post.shares}</span>
                  </button>
                </div>
                <button
                  onClick={() => handleBookmark(post.id)}
                  className="focus:outline-none"
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      bookmarkStatuses[post.id]
                        ? "text-yellow-500 fill-current"
                        : "hover:text-yellow-500 transition-colors"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {/* 댓글 목록 */}
              {comments[post.id]?.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start space-x-3 mb-4"
                >
                  <UserImage userId={comment.authorId} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">
                        {comment.authorName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}

              {/* 댓글 입력 폼 */}
              {isUser && (
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className={`px-4 py-2  text-white rounded-full text-sm  transition-colors ${
                      commentContent.trim() ? "opacity-100" : "opacity-80"
                    } ${
                      isDarkMode
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    댓글 작성
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
