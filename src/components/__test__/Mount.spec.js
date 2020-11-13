import { shallowMount, mount } from '@vue/test-utils';
import Parent from '../Parent';

// mount vs shallowMount
// mount()는 기본 마운트로 하위 컴포넌트를 렌더링 하지만,
// shallowMount()는 얕은 마운트로 하위 컴포넌트를 Stub 한다.
// 여기서 Stub 이란 실제로 동작하는 것처럼 보이는 객체를 의미한다.
describe('ParentComponent', () => {
  test('mount', () => {
    const wrapper = mount(Parent);
    console.log(wrapper.html());
    console.log('------------------------------');
  });
  test('shallowMount', () => {
    const wrapper = shallowMount(Parent);
    console.log(wrapper.html());
    console.log('------------------------------');
  });
});
// mount는 하위 컴포넌트도 같이 렌더링했기 때문에 <div>Children</div>이 출력되었다.
// 반면 shallowMount는 하위 컴포넌트를 Stub 컴포넌트(<children-stub></children-stub>)로 대체하여
// 실제 작동하는 것처럼 보이게 한다.
// 이는 하위 컴포넌트를 테스트에 포함하지 않아 독립적인 테스트가 가능하다.
// 특히 테스트 컴포넌트가 많은 하위 컴포넌트를 가지고 있을 때 유용하다.
