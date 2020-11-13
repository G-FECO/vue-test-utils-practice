const user = {
  name: 'wally',
  age: 27,
  completed: true
};

describe('VTU TEST', () => {
  // toBe: 받은 값과 기댓값이 같은지 비교
  // Primitive Data(string, number, bigint, boolean, undefined, symbol)를 비교하는데 사용
  test('Test 01-01. toBe Test', () => {
    expect(user.name).toBe('wally');
  });
  test('Test 01-02. toBe Test', () => {
    expect(user.age).toBe(27);
  });

  // toEqual, toStrictEqual: 객체나 배열 데이터의 모든 속성을 재귀적으로 비교
  test('Test 02-01. equal Test', () => {
    // toBe로 하면 테스트에 실패하는데, toEqual이나 toStrictEqual로 바꾸면 테스트에 성공한다.
    expect(user).toStrictEqual({
      name: 'wally',
      age: 27,
      completed: true
    });
  });

  // 다만, toEqual과 toStrictEqual은 아래와 같이 일부 엄격함의 차이가 있다.
  test('Test 02-02. undefined Test', () => {
    expect({ a: undefined }).toEqual({});
    expect({ a: undefined }).toStrictEqual({}); // Fails

    expect([undefined, 1]).toEqual([, 1]);
    expect([undefined, 1]).toStrictEqual([, 1]); // Fails
  });
  test('Test 02-03. Class Test', () => {
    class User {
      constructor(name) {
        this.name = name;
      }
    }
    expect(new User('Neo')).toEqual({ name: 'Neo' });
    expect(new User('Neo')).toStrictEqual({ name: 'Neo' }); // Fails
  });

  // toBeCloseTo: JS에서 10진수의 소수끼리 덧셈, 뺄셈을 하게 되면
  // 정확하게 소수점이 안 떨어지고 무한 소수가 발생하게 된다.
  // 그래서 이러한 경우에는 toBe를 사용하면 테스트에 실패하게 되고, toBeCloseTo를 사용하면 테스트에 성공한다.
  test('Test 03-01. toBeCloseTo', () => {
    expect(0.1 + 0.2).toBe(0.3); // Fail
    expect(0.1 + 0.2).toBeCloseTo(0.3); // Pass
  });

  // toContain, toContainEqual: 배열에 특정 요소가 포함되어 있는지 확인
  // toContain은 Primitive Data의 포함 여부를, toContainEqual은 객체 데이터의 포함 여부를 깊게 확인
  test('Test 04-01. Primitive', () => {
    const numbers = [10, 20, false];
    expect(numbers).toContain(10); // Pass
    expect(numbers).toContainEqual(false); // Pass
  });

  test('Test 04-02. Objects', () => {
    const items = [
      {
        id: 1,
        name: 'item1'
      },
      {
        id: 2,
        name: 'item2'
      }
    ];
    expect(items).toContain({
      id: 1,
      name: 'item1'
    }); // Fail
    expect(items).toContainEqual({
      id: 1,
      name: 'item1'
    }); // Pass
  });

  // cf) 문자열 내에 특정 문자열이 있는지 확인할 때는 toMatch를 사용하는 것을 추천한다.
  test('Test 04-03. String', () => {
    const sayHello = 'Hello, Wally';
    expect(sayHello).toContainEqual('Hello'); // Fail
    expect(sayHello).toMatch('Hello'); // Pass
  });

  // toThrow: 함수가 호출될 때 에러가 발생하는지 확인
  // [주의!] 에러를 던지는 함수를 별도의 함수로 한 번 랩핑해 실행하거나,
  // 호출 없이 함수 자체를 받은 값 인수로 사용해야 테스트 자체의 에러로 인식되지 않는다.
  function err(isPass) {
    if (!isPass) {
      throw new Error('I am your error');
    }
  }

  test('Test 05-01. Wrapping to a function', () => {
    // 익명 함수로 랩핑
    expect(() => {
      err();
    }).toThrow();
    // 호출 없이 함수 자체를 받은 값 인수로 사용
    expect(err).toThrow();
    // 아래 테스트 구문과 같이 에러가 발생할 함수를 직접 호출하지 말자!
    expect(err()).toThrow();
  });

  // 선택적으로 다음과 같은 인수를 사용할 수 있다.
  test('Test 05-02. toThrow Arguments', () => {
    // a) 오류 메시지의 하위 문자열
    expect(() => {
      err();
    }).toThrow('I am your error.');
    expect(() => {
      err();
    }).toThrow('m your err');
    // b) 오류 메시지 패턴과 일치하는 정규식
    expect(() => {
      err();
    }).toThrow(/^I.*errors?\.$/);
    // c) 오류 메시지와 일치하는 에러 인스턴스
    expect(() => {
      err();
    }).toThrow(new Error('I am your error'));
    // d) 에러 클래스
    expect(() => {
      err();
    }).toThrow(Error);
  });

  // 해당 함수가 에러를 던지지 않으면 테스트는 실패한다.
  test('Test 05-03. None Error', () => {
    expect(() => {
      err(true);
    }).toThrow(); // Fail
  });
});
