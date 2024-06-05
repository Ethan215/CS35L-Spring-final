export interface FriendData {
    _id: string;
    fromUserId: string;
    toUserId: string;
    status: 'pending' | 'accepted';
}