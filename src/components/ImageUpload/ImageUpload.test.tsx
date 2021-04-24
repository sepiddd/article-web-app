import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ImageUpload from "./ImageUpload";

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
  const setBase64 = jest.fn();

  act(() => {
    render(<ImageUpload setBase64={setBase64} mode='add' />, container);
  });

  expect(container.querySelector("[data-testid='remove-img']")).toBe(null);
  expect(container.querySelector("[data-testid='no-image']").textContent).toBe(
    "No images ulpoaded yet!"
  );
});

// mode==="edit"
it("Should render the component in edit mode without any image", () => {
  const fakeData = {
    base64: "",
    setBase64: () => {},
  };
  const setBase64 = jest.fn();

  act(() => {
    render(
      <ImageUpload
        setBase64={setBase64}
        mode='edit'
        base64={fakeData.base64}
      />,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='remove-img']")?.textContent
  ).toBe(undefined);
  expect(container.querySelector("[data-testid='no-image']").textContent).toBe(
    "No images ulpoaded yet!"
  );
});

it("Should render the component in edit mode with an image", () => {
  const fakeData = {
    base64: "fakeImage",
    setBase64: () => {},
  };

  act(() => {
    render(
      <ImageUpload
        setBase64={fakeData.setBase64}
        mode='edit'
        base64={fakeData.base64}
      />,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='remove-img']")?.textContent
  ).toBe("Remove Image");
  expect(container.querySelector("[data-testid='no-image']")).toBe(null);
  expect(
    container.querySelector("[data-testid='upload-img']").textContent
  ).toBe("Change Image");
  expect(
    container.querySelector("[data-testid='remove-img']").textContent
  ).toBe("Remove Image");
});

// mode==="read"

it("Should render the component in readonly", () => {
  const fakeData = {
    base64: "fakeImage",
    setBase64: () => {},
  };
  act(() => {
    render(
      <ImageUpload setBase64={() => {}} mode='read' base64={fakeData.base64} />,
      container
    );
  });
  expect(container.querySelector("[data-testid='upload-actions']")).toBe(null);
  expect(
    container
      .querySelector("[data-testid='uploaded-image']")
      .querySelector("img")
      .getAttribute("src")
  ).toBe(fakeData.base64);
});

it("should not render the component", () => {
  act(() => {
    render(
      <ImageUpload setBase64={() => {}} mode='read' base64='' />,
      container
    );
  });
  expect(container.querySelector("[data-testid='upload-actions']")).toBe(null);
  expect(container.querySelector("[data-testid='upload-image-wrap']")).toBe(
    null
  );
});
