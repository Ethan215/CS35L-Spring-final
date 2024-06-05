export interface MessageData {
  _id?: string;
  senderId: string;
  receiverId: string;
  title: string;
  body: string;
  createdAt?: Date;
  read: boolean;
}
