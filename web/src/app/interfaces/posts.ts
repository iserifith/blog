export interface IPost {
  category: string;
  isPublished: boolean;
  title: string;
  body: string;
  updatedAt?: Date;
  createdAt?: Date;
  _id?: string;
}
