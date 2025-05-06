export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: {
    url: string;
    fileId: string;
  };
  createdAt: string;
  updatedAt: string;
}
