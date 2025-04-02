export interface FeedItem {
    id: string | number;
    userId: string | number;
    content: string;
    author: string;
    createdAt: string;
    commentsCount: number;
    imageUrl: string;
}

export interface FeedResponse {
    items: FeedItem[];
}