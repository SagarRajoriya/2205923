export interface ApiPost {
    id: number | string;
    userid: number | string;
    content: string;
}

export interface Post {
    id: number | string;
    userId: number | string;
    content: string;
    title?: string;
    author?: string;
    createdAt: string | number;
    commentsCount?: number;
    imageUrl?: string;
}

export interface Comment {
    id: number | string;
    postid: number | string;
    content: string;
}