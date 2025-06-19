/* -------------------------------------------------------------------------- */
/*                   Директива управления поворотом элемента                  */
/* -------------------------------------------------------------------------- */

const SIDE = Object.freeze({
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
});

const sides = Object.freeze(Object.values(SIDE));
const maxRotationSteps = sides.length;

const DIRECTION = Object.freeze({
  FROM: "from",
  TO: "to",
});

const directions = Object.freeze(Object.values(DIRECTION));

const ROTATION_STEP = 90;

/**
 * @typedef {'top' | 'right' | 'bottom' | 'left'} Side - сторона
 */

/**
 * @typedef {'from' | 'to'} Direction
 */

/**
 * Поворот элемента между двумя сторонами
 *
 * @param {HTMLElement} element - элемент, который нужно повернуть
 * @param {Side} [arg=SIDE.TOP] - сторона, от которой отсчитывать поворот
 * v-rotate="{from: 'top', to: 'bottom'}" - поворот между 0 и 180 градусами,
 * v-rotate.right="{from: 'top', to: 'bottom'}" - между -90 и 90 градусами;
 * @param {Side} value.from - начальная сторона
 * @param {Side} value.to - сторона поворота
 * @param {Boolean} value.rotated - повернут ли элемент
 * @param {Number} [value.duration=1000] - время поворота в миллисекундах
 * @param {Boolean} [modifiers.clockwise=false] - повернуть ли элемент по часовой стрелке
 */
export default {
  mounted(
    element,
    {
      arg: originalSide = SIDE.TOP,
      value: {
        from: fromSide,
        to: toSide,
        rotated: isRotated,
        duration = 1000,
      },
      modifiers: { clockwise: isClockwise },
    }
  ) {
    try {
      const sidesValues = { fromSide, toSide, originalSide };
      for (const sideName in sidesValues) {
        if (!sides.includes(sidesValues[sideName]))
          throw new Error(`Wrong ${sideName}`);
      }

      if (typeof isRotated !== "boolean") throw new Error("Wrong isRotated");

      if (typeof duration !== "number") throw new Error("Wrong duration");
    } catch (error) {
      console.error(error);
      return;
    }

    const fromDegree = getRotationDegree({
      to: fromSide,
      from: originalSide,
      direction: DIRECTION.FROM,
    });

    const toDegree =
      getRotationDegree({
        to: toSide,
        from: fromSide,
        direction: DIRECTION.TO,
        isClockwise,
      }) + fromDegree;

    setRotationDegrees(element, fromDegree, toDegree, duration);
    rotate(element, isRotated);
  },

  updated(element, { value: { rotated: isRotated, duration = 1000 } }) {
    element.style.transition = `transform ${duration}ms`;
    rotate(element, isRotated);
  },
};

/**
 * Расчет угла поворота
 * @param {Side} args.from - начальная сторона
 * @param {Side} args.to - сторона поворота
 * @param {Direction} args.direction - направление поворота
 * @param {Boolean} [args.isClockwise=false] - повернуть ли элемент по часовой стрелке
 */
function getRotationDegree({ from, to, direction, isClockwise = false }) {
  let rotationDegrees = 0;

  const sign = isClockwise ? 1 : -1;
  let index = sides.indexOf(from);
  let stepsCount = 0;
  while (stepsCount < maxRotationSteps) {
    const side = sides.slice(index)[0];

    if (side === to && (stepsCount > 0 || direction !== DIRECTION.TO)) break;

    index = (index + sign) % maxRotationSteps;
    rotationDegrees += sign * ROTATION_STEP;
    stepsCount++;
  }

  return rotationDegrees;
}

/**
 * Установка углов поворота
 * @param {HTMLElement} element - поворачиваемый элемент
 * @param {Number} fromDegree - начальный угол
 * @param {Number} toDegree - угол поворота
 */
function setRotationDegrees(element, fromDegree, toDegree) {
  element.style.setProperty("--from-degree", `${fromDegree}deg`);
  element.style.setProperty("--to-degree", `${toDegree}deg`);
}

/**
 * Поворот элемента
 * @param {HTMLElement} element - поворачиваемый элемент
 * @param {Boolean} isRotated - состояние поворота
 */
function rotate(element, isRotated) {
  element.style.transform = isRotated
    ? "rotate(var(--to-degree))"
    : "rotate(var(--from-degree))";
}
