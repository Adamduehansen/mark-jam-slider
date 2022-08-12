import LevelScene from './LevelScene';
import MenuScene from './MenuScene';
import './style.css';

loadSprite('mark', './mark-eat-anim.png', {
  sliceX: 3,
  sliceY: 1,
  anims: {
    eat: { from: 1, to: 2 },
  },
});

scene('MenuScene', MenuScene);
scene('LevelScene', LevelScene);

// go('MenuScene');
go('LevelScene');
