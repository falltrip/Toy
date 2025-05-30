// /home/falltrip/Toy/postcss.config.js (루트 디렉토리에 있을 것으로 예상)
// 또는 /home/falltrip/Toy/client/postcss.config.js (만약 client 폴더 내에 있다면)

// module.exports = { ... } 형태가 아님.
// require('tailwindcss') 형태도 아님.

export default {
  plugins: {
    tailwindcss: {}, // 핵심: 이렇게 객체 형태로 지정해야 합니다.
    autoprefixer: {},
  },
};