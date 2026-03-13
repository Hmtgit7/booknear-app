import type { FeedPostType } from './enums';

export interface IFeedPost {
  id: string;
  authorId: string;
  type: FeedPostType;
  title?: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  authorAvatar?: string;
  authorSpecializations?: string[];
  isLikedByMe?: boolean;
}

export interface IFeedComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  isHidden: boolean;
  createdAt: string;
  authorName?: string;
  authorAvatar?: string;
}
