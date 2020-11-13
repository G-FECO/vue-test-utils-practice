module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true // 보고서 형태로 볼 수 있지만 이 옵션을 켜면 테스트 속도가 다소 떨어질 수 있다.
};
