export interface IRating {
  userId: string;
  raterId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}
