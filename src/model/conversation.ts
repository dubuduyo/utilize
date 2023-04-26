export type Comment = {
  comment: string;
  username: string;
  image?: string | undefined;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  roomname: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};
