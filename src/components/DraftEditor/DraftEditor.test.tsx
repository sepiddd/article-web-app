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

it("Should render the component in add add with setContent", () => {
  const onChange = jest.fn();
  act(() => {
    render(<DraftEditor mode='add' setContent={onChange} />, container);
  });

  expect(onChange).toHaveBeenCalledTimes(0);
});

it("Should render the component in edit mode with text and setContent", () => {
  const onChange = jest.fn();

  const fakeData = {
    text: {
      blocks: [
        {
          key: "97afb",
          text:
            "expect(item).not.toBeUndefined(); expect(item).not.toBeUndefined(); expect(item).not.toBeUndefined(); expect(item).not.toBeUndefined(); sdfsdf",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  };
  act(() => {
    render(
      <DraftEditor
        mode='edit'
        setContent={onChange}
        text={JSON.stringify(fakeData.text)}
      />,
      container
    );
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});
