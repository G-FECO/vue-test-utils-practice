import { shallowMount, mount } from '@vue/test-utils';
import HelloJest from '../HelloJest';

// describe: 테스트의 범위 설정
describe('HelloJest', () => {
  let wrapper;

  describe('ShallowMount', () => {
    // beforeAll, afterAll: 선언된 describe 범위 안에서 전후 동작
    // beforeEach, afterEach: 선언된 describe 범위 안에서 각 test 단우 ㅣ전후로 동작
    beforeEach(() => {
      wrapper = shallowMount(HelloJest);
    });
    // test: 단위 테스트 설정
    test('1', () => {
      expect(wrapper.text()).toBe('Hello');
    });
  });

  describe('Mount', () => {
    beforeEach(() => {
      // mount: 컴포넌트를 마운트하고 Wrapper 객체를 반환한다.
      wrapper = mount(HelloJest);
    });
    test('1', () => {
      // wrapper.vm으로 Vue 인스턴스에 접근한다.
      expect(wrapper.vm.msg).toBe('Hello');
    });
    test('2', () => {
      // .text()는 렌더링된 컴포넌트의 Text 내용을 반환한다.
      // HTMLElement.innerText와 비슷함
      expect(wrapper.text()).toBe('Hello');
    });
  });

  // 일부 테스트만 실행하고 싶을 때는 only를, 중단하고 싶을 때는 skip을 사용
  // 각 테스트 및 집합을 삭제하거나 주석 처리하지 않아도 되기 때문에 편리하다.
  // describe.only('Computed', () => {
  //   test('1', () => {});
  // });
  // describe.skip('Mounted', () => {
  //   test('2', () => {});
  // });
  // describe('Updated', () => {
  //   test.skip('2', () => {});
  // });
});
