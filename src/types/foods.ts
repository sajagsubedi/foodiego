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

export interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  markedPrice?: number;
  categoryId: string;
  category?: Category;
  image: {
    url: string;
    fileId: string;
  };
  isFeatured: boolean;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}
