export interface User {
    id: string;
    name: string;
    postCount: number;
    followerCount?: number;
}

export interface UsersResponse {
    users: {
        [key: string]: string;
    };
}