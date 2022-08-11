function rectangle(x, y) {
  let array = [];

  let newArr = [];
  let xArr = [];

  array.push(newArr);

  array.length = x;

  for (let i = 1; i <= y; i++) {
    let string = "*";

    newArr.push(string);
  }

  if (x - 2 != 0) {
    let length = x - 2;

    for (let i = 1; i <= length; i++) {
      let xArr = [];

      let string = "*";

      let emptyString = "";

      xArr[0] = string;

      xArr[y - 1] = string;

      for (let i = 1; i < xArr[length]; i++) {
        xArr[i] = emptyString;
      }
      array.push(xArr);
    }
  } else {
    for (let i = 1; i <= y; i++) {
      let xArr = [];

      let string = "*";

      xArr.push(string);
    }
  }

  for (let i = 1; i <= y; i++) {
    let string = "*";

    xArr.push(string);
  }
  array.push(xArr);

  console.log(array);

  let toString = array.map((e) => {
    return e.toString();
  });

  console.log(toString);
}

rectangle(2, 5);
