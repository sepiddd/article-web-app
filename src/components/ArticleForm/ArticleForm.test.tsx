import { store } from "../../redux/store";
import { Provider } from "react-redux";

import { render } from "@testing-library/react";
import ArticleForm from "./ArticleForm";
import { IArticleMode } from "../../types";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const renderItem = (mode: IArticleMode) => {
  return render(
    <Provider store={store}>
      <ArticleForm mode={mode} />
    </Provider>
  );
};

// const getArticle = (id: string) => {
//   const article = store
//     .getState()
//     .articles.articlesList.find((p) => p.id === id);
//   expect(article).toBeUndefined();
//   return article as IArticle;
// };

// test("renders article form", () => {
//   // const article = getArticle("1");
//   const { asFragment } = renderItem("edit");
//   expect(asFragment()).not.toBeUndefined();
// });

test("renders article form in edit mode", () => {
  // const article = getArticle("1");
  const { asFragment } = renderItem("edit");
  expect(asFragment()).not.toBeUndefined();
});

test("renders article form in add mode", () => {
  // const article = getArticle("1");
  const { asFragment } = renderItem("add");
  expect(asFragment()).not.toBeUndefined();
});
