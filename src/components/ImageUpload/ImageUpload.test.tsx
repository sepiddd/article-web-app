import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ImageUpload from "./ImageUpload";

// const img = "";

// describe("ArticleForm component", () => {
//   test("Matches the snapshot", () => {
//     const readMode = create(
//       <ImageUpload setBase64={() => console.log("readMode")} mode='read' />
//     );
//     const addMode = create(
//       <ImageUpload setBase64={() => console.log("addMode")} mode='add' />
//     );
//     const editMode = create(
//       <ImageUpload setBase64={() => console.log("editMode")} mode='edit' />
//     );

//     const editModeWithBase64 = create(
//       <ImageUpload
//         setBase64={() => console.log("editMode")}
//         mode='edit'
//         base64={img}
//       />
//     );

//     const editModeWithResetForm = create(
//       <ImageUpload
//         setBase64={() => console.log("editMode")}
//         mode='edit'
//         base64={img}
//         resetForm
//       />
//     );

//     expect(readMode.toJSON()).toMatchSnapshot();
//     expect(addMode.toJSON()).toMatchSnapshot();
//     expect(editMode.toJSON()).toMatchSnapshot();
//     expect(editModeWithBase64.toJSON()).toMatchSnapshot();
//     expect(editModeWithResetForm.toJSON()).toMatchSnapshot();
//   });
// });

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

// mode==="edit"

it("Image Upload edit mode Without image", () => {
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
  expect(setBase64).toHaveBeenCalledTimes(0);
});

it("Image Upload edit mode With image", () => {
  const fakeData = {
    base64: "x.image",
    setBase64: () => {},
  };
  const setBase64 = jest.fn();

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
  expect(setBase64).toHaveBeenCalledTimes(0);
});

// mode==="read"

it("Image Upload read mode a image", () => {
  act(() => {
    render(
      <ImageUpload setBase64={() => {}} mode='read' base64='' />,
      container
    );
  });
  expect(container.querySelector("[data-testid='remove-img']")).toBe(null);
  expect(container.querySelector("[data-testid='no-image']").textContent).toBe(
    "No images ulpoaded yet!"
  );
  expect(container.querySelector("[data-testid='upload-img']")).toBe(null);
});
