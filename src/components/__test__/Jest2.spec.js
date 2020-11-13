const user = {
  name: 'wally',
  getName() {
    return this.name;
  }
};

// toHaveBeenCalled: 테스트에서 함수가 호출된 적이 있는지 확인
// 중요한 것은 해당 함수가 감시(spy)되거 있거나 모의(mock) 함수여야 한다.
// 또한 toHaveBeenCalld는 함수의 호출만 체크하므로 함수에서 에러를 던져도 테스트는 통과한다.(try/catch문 사용시)
// 함수에서 에러를 던질 때 테스트가 실패하도록 하려면 toHaveReturned가 더 적합하다.
test('Test 06-01. toHaveBeenCalled', () => {
  jest.spyOn(user, 'getName'); // getName 이라는 함수를 감시
  user.getName(); // getName 함수 호출
  expect(user.getName).toHaveBeenCalled(); // Pass
});

const product = {
  id: 123,
  name: '',
  getName() {
    if (!this.name) {
      throw new Error('Not Product name!');
    }
    return this.name;
  }
};

function displayProductName(product) {
  try {
    return product.getName();
  } catch (error) {
    // console.log(error);
  }
}

// toHaveReturned는 toHaveBeenCalled와 같이 함수의 호출도 있어야 하지만 반환 갑시 있어야 한다.
// 함수는 return 키워드를 사용하지 않아도 기본적으로 undefined를 반환하는데
// toHaveReturned는 이 undefined도 함수의 반환 값으로 확인한다.
// 따라서 함수가 에러 없이 정상적으로 호출되는지 확인하는 용도로 사용할 수 있다.
// toHaveBeenCalled와 마찬가지로 해당 함수가 감시(spy)되거 있거나 모의(mock) 함수여야 한다.
// 만약에 반환 값이 무엇인지 확인하고 싶다면 toHaveRetrnedWith을 사용하면 된다.
test('Test 06-02. toHaveReturned', () => {
  jest.spyOn(product, 'getName');
  displayProductName(product);
  expect(product.getName).toHaveBeenCalled(); // Pass
  expect(product.getName).toHaveReturned(); // Fail
});

// toHaveReturnedWith: 함수가 호출되고 어떤 값을 반환했는지 확인
// 함수가 여러 번 호출되고 각각 반환 값이 다른 경우, 기댓값이 모든 호출 중 하나의 반환과 일치하면 테스트는 통과
const students = {
  names: ['wally', 'risa', 'mike', 'elice'],
  getName(index) {
    return this.names[index];
  }
};

test('Test 06-03. toHaveReturnedWith', () => {
  jest.spyOn(students, 'getName');
  students.getName(0); // 'wally'
  students.getName(1); // 'risa'
  students.getName(2); // 'mike'
  expect(students.getName).toHaveReturnedWith('risa'); // Pass
  expect(students.getName).toHaveReturnedWith('elice'); // Fail
});

// toHaveProperty: 객체에서 찾고자 하는 속성의 존재 여부와 그 값을 확인할 수 있다.
// 속성의 경로를 명시할 때 점 표기법이나 속성 경로를 나열하는 배열을 사용할 수 있다.
const customer = {
  name: 'Muzi',
  age: 30,
  address: {
    address1: 'address',
    sido: 'Seoul',
    zonecode: '03187'
  },
  belongings: ['phone', 'laptop', { mouse: 'Logitech' }, [100, 1000]],
  membership: undefined,
  getName() {
    return this.name;
  }
};

test('Test 06-04. toHaveProperty', () => {
  expect(customer).toHaveProperty('age');
  expect(customer).toHaveProperty('age', 30);
  // 점 표기법
  expect(customer).toHaveProperty('address.sido');
  expect(customer).toHaveProperty('address.sido', 'Seoul');
  // 속성 경로를 나열하는 배열 표기법
  expect(customer).toHaveProperty(['address', 'sido'], 'Seoul');
  expect(customer).toHaveProperty(['belongings', 0], 'phone');
  expect(customer).toHaveProperty(['belongings', 2, 'mouse'], 'Logitech');
  expect(customer).toHaveProperty(['belongings', 3, 0], 100);
  // 명시적 undefined를 가지는 속성은 존재한다고 판단하니 주의할 것!
  expect(customer).toHaveProperty('membership');
  // 메소드 존재 여부도 확인 가능
  expect(customer).toHaveProperty('getName');
});
