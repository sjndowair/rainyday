import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  addDoc,
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../constants/firebase-contants";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 공통 user 관리 훅
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // users 컬렉션에 사용자 정보 저장
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(
          userRef,
          {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          { merge: true }
        );
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return { user, setUser };
};

// Messages 훅
export const useMessages = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [beforeMessage, setBeforeMessage] = useState("");
  const [isSaveMessage, setIsSaveMessage] = useState(true);

  const saveMessage = async () => {
    if (!user) {
      console.error("No user found");
      return;
    }

    try {
      const messageData = {
        message: isSaveMessage ? message : beforeMessage,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "messages", user.uid), messageData);
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  };

  const fetchMessage = async () => {
    if (!user) return;

    try {
      const docSnap = await getDoc(doc(db, "messages", user.uid));
      if (docSnap.exists()) {
        setMessage(docSnap.data().message);
      }
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error;
    }
  };

  return {
    user,
    message,
    setMessage,
    beforeMessage,
    setBeforeMessage,
    isSaveMessage,
    setIsSaveMessage,
    saveMessage,
    fetchMessage,
  };
};

// Posts 훅
interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  postImage?: string;
  createdAt: any;
  likes: number;
  comments: number;
  shares: number;
}

// 좋아요 상태 인터페이스 추가
interface ILikeStatus {
  userId: string;
  postId: string;
  liked: boolean;
}

interface IComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  content: string;
  createdAt: any;
}

export const usePosts = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState("");

  // Posts 조회 쿼리
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IPost[];
    },
    enabled: !!user,
  });

  // 사용자의 좋아요 상태 조회
  const { data: likeStatuses = {} } = useQuery({
    queryKey: ["likes", user?.uid],
    queryFn: async () => {
      if (!user) return {};
      const likesDoc = await getDoc(doc(db, "userLikes", user.uid));
      return likesDoc.exists() ? likesDoc.data() : {};
    },
    enabled: !!user,
  });

  // 북마크 상태 조회
  const { data: bookmarkStatuses = {} } = useQuery({
    queryKey: ["bookmarks", user?.uid],
    queryFn: async () => {
      if (!user) return {};
      const bookmarksDoc = await getDoc(doc(db, "userBookmarks", user.uid));
      return bookmarksDoc.exists() ? bookmarksDoc.data() : {};
    },
    enabled: !!user,
  });

  // 댓글 조회 쿼리
  const { data: comments = {} } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const commentsMap: { [postId: string]: IComment[] } = {};
      const snapshot = await getDocs(collection(db, "comments"));
      snapshot.docs.forEach((doc) => {
        const comment = { id: doc.id, ...doc.data() } as IComment;
        if (!commentsMap[comment.postId]) {
          commentsMap[comment.postId] = [];
        }
        commentsMap[comment.postId].push(comment);
      });
      return commentsMap;
    },
    enabled: !!user,
  });

  // 이미지 변환 함수는 게시물 이미지에 필요하므로 유지
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Post 생성 뮤테이션
  const { mutateAsync: savePost } = useMutation({
    mutationFn: async () => {
      if (!user || !title || !content) {
        throw new Error("Missing data");
      }

      let postImageBase64 = "";
      if (imageFile) {
        postImageBase64 = await convertImageToBase64(imageFile);
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        postImage: postImageBase64,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: 0,
        shares: 0,
      };

      const docRef = await addDoc(collection(db, "posts"), postData);
      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setContent("");
      setImageFile(null);
    },
  });

  // 좋아요 토글 뮤테이션
  const toggleLike = useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      if (!user) throw new Error("User not logged in");

      const postRef = doc(db, "posts", postId);
      const userLikesRef = doc(db, "userLikes", user.uid);
      const newLikeStatus = !likeStatuses[postId];

      await setDoc(
        userLikesRef,
        {
          ...likeStatuses,
          [postId]: newLikeStatus,
        },
        { merge: true }
      );

      const post = posts.find((p) => p.id === postId);

      if (!post) throw new Error("Post not found");

      await updateDoc(postRef, {
        likes: newLikeStatus ? (post.likes || 0) + 1 : (post.likes || 0) - 1,
      });

      return { postId, liked: newLikeStatus };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  // usePosts 훅에 삭제 뮤테이션 추가
  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error("User not logged in");
      await deleteDoc(doc(db, "posts", postId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // 북마크 토글 뮤테이션
  const toggleBookmark = useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      if (!user) throw new Error("User not logged in");

      const userBookmarksRef = doc(db, "userBookmarks", user.uid);
      const newBookmarkStatus = !bookmarkStatuses[postId];

      await setDoc(
        userBookmarksRef,
        {
          ...bookmarkStatuses,
          [postId]: newBookmarkStatus,
        },
        { merge: true }
      );

      return { postId, bookmarked: newBookmarkStatus };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  // 댓글 작성 뮤테이션
  const addComment = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      if (!user || !content.trim()) throw new Error("Missing data");

      const commentData = {
        postId,
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        content: content.trim(),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "comments"), commentData);

      // 게시물의 댓글 수 업데이트
      const postRef = doc(db, "posts", postId);
      const post = posts.find((p) => p.id === postId);
      if (post) {
        await updateDoc(postRef, {
          comments: (post.comments || 0) + 1,
        });
      }

      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setCommentContent("");
    },
  });

  return {
    user,
    title,
    setTitle,
    content,
    setContent,
    posts,
    imageFile,
    setImageFile,
    savePost,
    likeStatuses,
    toggleLike,
    isPending: toggleLike.isPending,
    deletePost,
    bookmarkStatuses,
    toggleBookmark,
    comments,
    commentContent,
    setCommentContent,
    addComment,
  };
};
