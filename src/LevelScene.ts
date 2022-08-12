import k from './KaboomContext';
import type {
  PosComp,
  SpriteComp,
  MergeComps,
  AreaComp,
  ScaleComp,
  Vec2,
} from 'kaboom';

type Player = MergeComps<SpriteComp | PosComp | AreaComp | ScaleComp>;

const INITIAL_PLAYER_SIZE = 26;

function LevelScene() {
  let keyPressed = false;
  let currentMarkXSpeed = 0;
  let currentMarkYSpeed = 0;
  let markAcceleration = 10;
  let score = 0;

  const mark = createMark();

  onKeyDown('right', () => {
    currentMarkXSpeed += markAcceleration;
    keyPressed = true;
  });

  onKeyDown('left', () => {
    currentMarkXSpeed -= markAcceleration;
    keyPressed = true;
  });

  onKeyDown('up', () => {
    currentMarkYSpeed -= markAcceleration;
    keyPressed = true;
  });

  onKeyDown('down', () => {
    currentMarkYSpeed += markAcceleration;
    keyPressed = true;
  });

  onKeyRelease(() => {
    keyPressed = false;
  });

  onUpdate(movePlayer(mark));
  onUpdate(checkBorderCollision(mark));

  onDraw(() => {
    drawText({
      text: `SCORE: ${score}`,
      size: 36,
      font: 'sink',
      pos: vec2(20, 20),
    });
  });

  loop(3, () => {
    if (get('apple').length < 3) {
      createApple();
    }
  });

  function createApple() {
    return add([
      rect(50, 50),
      color(255, 255, 0),
      area(),
      pos(
        Math.floor(rand(50, width() - 50)),
        Math.floor(rand(50, height() - 50))
      ),
      z(15),
      'apple',
    ]);
  }

  function createMark(): Player {
    const mark = add([
      sprite('mark', {
        width: INITIAL_PLAYER_SIZE,
        height: INITIAL_PLAYER_SIZE,
        animSpeed: 0.5,
      }),
      pos(width() / 2, height() / 2),
      area(),
      k.origin('center'),
      scale(4),
      z(10),
    ]);

    const markMouth = add([
      rect(20, 20),
      k.origin('center'),
      pos(mark.pos.x, mark.pos.y),
      z(5),
      area(),
    ]);
    markMouth.onCollide('apple', (apple) => {
      apple.destroy();
      score += 1;
      const { x, y } = mark.scale as Vec2;
      mark.scaleTo(vec2(x + 0.1, y + 0.1));
      mark.play('eat');
      createApple();
    });

    onUpdate(() => {
      markMouth.pos.x = mark.pos.x;
      markMouth.pos.y = mark.pos.y + 20;
    });

    return mark;
  }

  function movePlayer(player: Player) {
    return function () {
      console.log(player.pos.x);

      if (!keyPressed) {
        if (currentMarkXSpeed !== 0) {
          if (currentMarkXSpeed > 0) {
            currentMarkXSpeed -= markAcceleration;
          }
          if (currentMarkXSpeed < 0) {
            currentMarkXSpeed += markAcceleration;
          }
        }

        if (currentMarkYSpeed !== 0) {
          if (currentMarkYSpeed > 0) {
            currentMarkYSpeed -= markAcceleration;
          }
          if (currentMarkYSpeed < 0) {
            currentMarkYSpeed += markAcceleration;
          }
        }
      }
      player.move(currentMarkXSpeed, currentMarkYSpeed);
    };
  }

  function isOutOfBounds(player: Player): boolean {
    const { x, y } = player.pos;
    return (
      x > width() - player.width / 2 ||
      x < 0 ||
      y < player.height / 2 ||
      y > height() - player.height / 2
    );
  }

  function checkBorderCollision(player: Player) {
    return function () {
      if (!isOutOfBounds(player)) {
        return;
      }
      go('MenuScene');
    };
  }
}

export default LevelScene;
