export interface IInvite {
  email: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  isAccepted: boolean;
}
