export type IArticle = {
  title: string;
  content: any;
  date: string;
  id?: string;
  image?: string;
};

export type IArticleMode = "create" | "edit" | "read";
