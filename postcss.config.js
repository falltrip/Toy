// postcss.config.js
// CommonJS (Node.js 기본) 방식:
module.exports = {
  plugins: {
    tailwindcss: {}, // Tailwind CSS 3.x 이상에서는 이 형태가 일반적입니다.
    autoprefixer: {},
  },
};

// ES Module (Vite 환경에서 사용 가능) 방식:
// import tailwindcss from 'tailwindcss'; // 더 이상 이렇게 직접 import하지 않습니다.
// import autoprefixer from 'autoprefixer';

// export default {
//   plugins: [
//     tailwindcss(), // 더 이상 이렇게 사용하지 않습니다.
//     autoprefixer(),
//   ],
// };