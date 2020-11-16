import { shallowMount } from '@vue/test-utils';
import Spyon from '../Spyon';

// jest.spyOn()
// 실제 함수를 모의 함수로 덮어쓰지 않고도 호출 감시를 목적으로 사용
// created hook에서 fetchComments로 데이터를 가져오는데
// mounting 이후 fetchComments가 호출되었는지 확인하기 위해
// jest.spyOn()을 사용한다.
// (감시 대상(메소드)은 곧 모의 함수이다.)

// describe('spyOn', () => {
//   let wrapper;
//   const spy = {};
//   beforeEach(() => {
//     // fetchComments가 created hook에서 호출되기 때문에
//     // 컴포넌트가 마운트되기 전에 fetchComments 메소드에 스파이를 심어 감시
//     spy.fetchComments = jest.spyOn(Spyon.methods, 'fetchComments');
//     wrapper = shallowMount(Spyon);
//   });

//   test('가져오기 호출 확인', () => {
//     // 스파이를 통해 호출 여부를 확인할 수 있다.
//     expect(spy).toHaveBeenCalled();
//   });
// });

// 만약 기존 예제의 fetchComments를 테스트를 위해 다르게 구현해야 할 때
// jest.fn()과 같이 jest.spyOn()도 모의 함수를 반환하므로 .mockImplementation()을 사용할 수 있다.
describe('spyOn', () => {
  let wrapper;
  const spy = {};
  beforeEach(() => {
    // 컴포넌트가 마운트되기 전에 fetchComments 메소드에 스파이를 심어 감시
    spy.fetchComments = jest
      .spyOn(Spyon.methods, 'fetchComments')
      .mockImplementation(num => num + 1);
    wrapper = shallowMount(Spyon);
  });

  // test('가져오기 호출 확인', () => {
  //   // 스파이를 통해 호출 여부를 확인할 수 있다.
  //   expect(spy.fetchComments).toHaveBeenCalled();
  //   expect(wrapper.vm.fetchComments(1)).toBe(2);
  // });

  // 추가로 spy.fetchComments는 이전 테스트('가져오기 호출 확인')를 통해서
  // 호출 정보가 추가되었으므로 다음 테스트에 영향을 주게 된다.
  // 그래서 아래와 같이 afterEach hook에서 jest.clearAllMocks() 등을 사용해
  // 모의 함수 호출 정보를 초기화하는 것이 좋다.
  afterEach(() => {
    // 모든 모의 함수의 호출 정보를 초기화
    jest.clearAllMocks();
    // 원하는 모의 함수만 초기화하고 싶을 때
    // spy.fetchComments.mockClear();
  });

  test('가져오기 호출 확인', () => {
    expect(spy.fetchComments).toHaveBeenCalled();
    expect(wrapper.vm.fetchComments(1)).toBe(2);
  });

  test('가져오기 호출 확인 다음 테스트', () => {
    // 모의 함수의 호출 정보를 초기화하지 않으면 호출 횟수는 1이 아닌 3이 된다.
    expect(spy.fetchComments).toHaveBeenCalledTimes(1);
  });
});

// cf) Mock funcitons

// (1) .mockClear()
// - 모의 함수 호출에 대한 모든 정보를 초기화
// - 호출 정보는 .mock.calls와 .mock.results에 배열로 저장됨

// (2) .mockReset()
// - 모의 함수의 모든 상태를 초기화
// - 여기서 상태는 모든 호출 정보 및 모의 함수 구현 부를 포함
// - 따라서 초기화된 모의 함수는 undefined가 됨
// .mockReset() = .mockClear() + Reset

// (3) .mockRestore()
// - 모의 함수의 모든 상태를 초기화하고, 모의 함수 구현을 원래의 함수 구현으로 복원(restore)함
// - 단, jest.spyOn()을 사용한 경우만 복원할 수 있다.
// .mockRestore() = .mockReset() + Restore
