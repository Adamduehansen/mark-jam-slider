import kaboom from 'kaboom';

const k = kaboom({
  width: 1024,
  height: 800,
  root: document.getElementById('app')!,
  background: [0, 0, 0],
  debug: true,
});

export default k;
