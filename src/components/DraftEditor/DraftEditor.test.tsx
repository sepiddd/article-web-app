import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DraftEditor from "./DraftEditor";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// mode==="add"
it("Should render the component in add mode", () => {
  act(() => {
    render(<DraftEditor mode='add' />, container);
  });

  expect(container.textContent).toBe("Content...");
});

it("Should render the component in add modee", () => {
  const onChange = jest.fn();
  act(() => {
    render(<DraftEditor mode='add' setContent={onChange} />, container);
  });

  expect(container.querySelector("[data-testid='remove-img']")).toBe(null);
});
