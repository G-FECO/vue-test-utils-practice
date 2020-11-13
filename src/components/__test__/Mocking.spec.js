import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import Mocking from '../Mocking';

describe('Mocking Test', () => {
  let wrapper;
  beforeEach(() => {
    // 반환할 가짜 응답 결과
    const response = {
      data: {
        name: 'id labore ex et quam laborum'
      }
    };

    // 컴포넌트가 마운트되기 전에 Mocking 작업 수행
    // axios.get()은 Promise를 반환하므로 mockResolvedValue를 사용
    // axios.get은 created hook에서 호출되기 때문에 꼭 Mounting 전에 모의 함수로 만들어야 한다.
    axios.get = jest.fn().mockResolvedValue(response);
    // 아래 코드와 동일한 의미
    // axios.get = jest.fn(() => new Promise(resolve => resolve(response)))

    // 컴포넌트 마운트
    wrapper = shallowMount(Mocking);
  });

  test('데이터 가져오는 함수 호출 확인', () => {
    expect(axios.get).toHaveBeenCalled();
  });

  test('가져온 데이터가 정상적으로 렌더링 되었는지 확인', () => {
    // 가짜 요청/응답이므로 네트워크에 의존할 필요가 없기 때문에
    // 더 이상 setTimeout이 필요하지 않다.
    expect(wrapper.text()).toBe('id labore ex et quam laborum');
    // cf) Wrapper 객체를 통해 Vue 인스턴스(vm)에 접근할 수 있다.
    expect(wrapper.vm.comment.name).toBe('id labore ex et quam laborum');
  });
});
