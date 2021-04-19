export type IArticle = {
  title: string;
  content: any;
  date: string;
  id?: string;
};

export type IArticleMode = "create" | "edit" | "read";
