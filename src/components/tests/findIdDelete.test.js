import { findAtIndexAndDelete } from "../helperFunctions/findIdDelete";
describe("Helper Functions", () => {
  it("Find Index in array and deletes item", () => {
    const myArr = [{ _id: "1" }];
    expect(findAtIndexAndDelete(myArr, "1")).toEqual([]);
  });
  it("will return the same array if bad id", () => {
    const myArr = [{ _id: "1" }];
    expect(findAtIndexAndDelete(myArr, "2")).toEqual(myArr);
  });
});
