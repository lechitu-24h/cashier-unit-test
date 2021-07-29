const products = [
  {
    name: "Apple",
    key: "apple",
    unit: 0.5,
  },
  {
    name: "Banana",
    key: "banana",
    unit: 0.8,
  },
  {
    name: "Coke",
    key: "coke",
    unit: 0.5,
  },
  {
    name: "Coke Zero",
    key: "cokeZero",
    unit: 0.5,
  },
];

export class Store {
  constructor() {
    this.cart = [];
  }

  scan(name, amount = 1) {
    products.forEach((product) => {
      if (product.key === name) {
        const item = {
          name: product.name,
          key: product.key,
          unit: product.unit,
          amount: amount,
          discount: 0,
        };
        this.cart.push(item);
      }
    });
  }

  cancel(name, amount = 1) {
    this.cart.forEach((item, index, object) => {
      if (name === item.key) {
        item.amount = item.amount - amount;
        if (item.amount === 0) {
          object.splice(index, 1);
        }
      }
    });
  }

  discount(name, type) {
    this.cart.forEach((item, index) => {
      if (name === item.key) {
        if (type === "buy-one-get-one-free")
          this.cart[index] = {
            ...this.cart[index],
            discount: item.unit * Math.floor(item.amount / 2),
          };
        if (type === "50%")
          this.cart[index] = {
            ...this.cart[index],
            discount: item.unit * item.amount * 0.5,
          };
      }
    });
  }

  print() {
    let printBill = "";
    this.cart.forEach((item) => {
      printBill = printBill.concat(
        `${item.name} (${item.unit}) x ${item.amount}\n`
      );
      if (item.discount)
        printBill = printBill.concat(
          `Discount: ${item.name} ${item.discount}\n`
        );
    });
    printBill = printBill.concat(`Total: ${this.getTotal()}`);
    return printBill;
  }

  getTotal() {
    let total = 0;
    this.cart.forEach((item) => {
      total += item.unit * item.amount - item.discount;
    });
    return total;
  }
}
