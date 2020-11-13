import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import App from '../../App.vue';
import store from '../../store.js';

const localVue = createLocalVue();
localVue.use(Vuex);

const wrapper = mount(App, {
  localVue,
  store
});

// createLocalVue는 테스트에서 사용할 로컬 Vue 클래스를 반환한다.
// 젼역 Vue 클래스를 오염시키지 않고, mixin, plugin 등을 추가할 때 사용할 수 있는 일종의 가짜 Vue 객체이다.
