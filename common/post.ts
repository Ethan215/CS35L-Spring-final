export interface PostData {
    _id?: string;
    userId: string;
    username: string;
    profilePicture?: string;
    title:string;
    body: string;
    createdAt?: Date;
    likes: string[];
    comments: CommentData[];
}

export interface CommentData {
    _id?: string;
    userId: string;
    username: string;
    profilePicture?: string;
    body: string;
    createdAt?: Date;
}