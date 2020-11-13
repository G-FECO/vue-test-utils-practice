function asyncFunc(fail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error('Fail!'));
      }
      resolve('Pass!');
    }, 6000);
  });
}

describe('비동기 처리', () => {
  // test()에서 done을 인수로 사용할 때
  // done이 호출될 때까지 테스트는 기다림
  // done이 호출되지 않으면 테스트는 기본적으로 5초 후에 실패
  test('done', done => {
    asyncFunc().then(res => {
      expect(res).toBe('Pass!');
      done();
    });
  });

  // test()에서 Promise를 반환하면
  // 그 Promise가 resolve될 때까지 기다림
  // 만약 reject되면 테스트는 실패
  test('return Promise', () => {
    return asyncFunc().then(res => {
      expect(res).toBe('Pass!');
    });
  });

  // 받은 값(expect)과 기댓값(Matcher) 사이에 2개의 Bridge 속성을 사용할 수 있따.
  // .resolves => Promise가 이행될 때까지 기다림
  // .rejects => Promise가 거절될 때까지 기다림
  // Assertion(Expect 구문)을 반환(return)해야 테스트는 기다린다.
  test('resolves', () => {
    return expect(asyncFunc()).resolves.toBe('Pass!');
  });
  test('rejects', () => {
    return expect(asyncFunc('fail')).rejects.toThrow('Fail!');
  });

  // test()의 콜백 함수를 비동기 함수로 선언하면
  // 테스트는 작성된 await에 맞게 기다린다.
  test('async/await', async () => {
    const res = await asyncFunc();
    expect(res).toBe('Pass!');
  });
});

// test 함수는 테스트 완료까지 기본적으로 최대 5초까지 기다린다.
// 5초가 지나면 테스트가 실패하므로 상황에 따라서 기다리는 시간을 늘려줘야 하는데
// test 함수의 세 번째 인자로 [ms] 단위의 시간을 입력하며 기다리는 시간을 늘릴 수 있다.
test('setTimeout이 6초 여도 이 테스트는 최대 5초까지 기다리므로 실패!', async () => {
  const res = await asyncFunc();
  expect(res).toBe('Pass!');
});

test('이 테스트는 최대 7초까지 기다리므로 통과!', async () => {
  const res = await asyncFunc();
  expect(res).toBe('Pass!');
}, 7000);
