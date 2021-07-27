import { Store } from "../../components/Cashier";

describe("I can scan one apple", () => {
  const store = new Store();
  store.scan("apple");
  const print = store.print();

  it("total", () => {
    expect(print).toBe("Apple (0.5) x 1\nTotal: 0.5");
  });
});

describe("I can scan one apple and one banana", () => {
  const store = new Store();
  store.scan("apple");
  store.scan("banana");
  const print = store.print();

  it("total", () => {
    expect(print).toBe("Apple (0.5) x 1\nBanana (0.8) x 1\nTotal: 1.3");
  });
});

describe("I can scan two apples, and cancel one apple", () => {
  const store = new Store();
  store.scan("apple", 2);
  store.cancel("apple");
  const print = store.print();

  it("total", () => {
    expect(print).toBe("Apple (0.5) x 1\nTotal: 0.5");
  });
});

describe("I can apply buy-one-get-one-free discount for apple, and scan 3 apples", () => {
  const store = new Store();
  store.scan("apple", 3);
  store.discount("apple", "buy-one-get-one-free");
  const print = store.print();

  it("total", () => {
    expect(print).toBe("Apple (0.5) x 3\nDiscount: Apple 0.5\nTotal: 1");
  });
});

describe("I can apply 50% off discount for apple, and scan 3 apples", () => {
  const store = new Store();
  store.scan("apple", 3);
  store.discount("apple", "50%");
  const print = store.print();

  it("total", () => {
    expect(print).toBe("Apple (0.5) x 3\nDiscount: Apple 0.75\nTotal: 0.75");
  });
});
