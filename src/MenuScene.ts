function MenuScene() {
  add([
    text('Press space to start', {
      font: 'sink',
      size: 48,
    }),
    pos(width() / 2, height() / 2),
    // @ts-ignore
    origin('center'),
  ]);

  onKeyPress('space', () => {
    go('LevelScene');
  });
}

export default MenuScene;
