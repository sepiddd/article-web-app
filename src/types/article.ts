export type IArticle = {
  title: string;
  content: any;
  date: string;
  id?: string;
  image?: string;
  userId: string;
};

export type IArticleMode = "add" | "edit" | "read";
