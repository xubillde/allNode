import {
  expect
} from "chai";
let a = 2;

beforeEach(function () {
  a = 3;
});

describe("test 01", function () {
  it("add", function () {
    expect(a).to.equal(3);
  });
});
