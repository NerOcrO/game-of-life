/**
 * @param {Array.<Object>} neighborCells
 *   Neighbor's cells.
 *
 * @return {number}
 *   Counter of alive.
 */
export const alivesCounter = neighborCells => neighborCells.filter(cell => cell.alive).length

/**
 * @param {Array.<Object>} neighborCells
 *   Neighbor's cells.
 *
 * @return {boolean}
 *   True if it's his birth.
 */
export const isBirth = neighborCells => alivesCounter(neighborCells) === 3

/**
 * @param {Array.<Object>} neighborCells
 *   Neighbor's cells.
 *
 * @return {boolean}
 *   True if it's his death.
 */
export const isDeath = (neighborCells) => {
  const alives = alivesCounter(neighborCells)
  return alives < 2 || alives > 3
}

/**
 * @param {Array.<Object>} neighborCells
 *   Neighbor's cells.
 * @param {Array.<Object>} cell
 *   Current cell.
 *
 * @return {boolean}
 *   True if the cell is alive, false if the cell is dead
 *   or the cell don't change.
 */
export const evolutionOfCell = (neighborCells, cell) => {
  let hasChanged = false

  hasChanged = cell.alive === true ? isDeath(neighborCells) : hasChanged = isBirth(neighborCells)

  return hasChanged ? !cell.alive : cell.alive
}

/**
 * @param {Array.<Object>} cell
 *   Current cell.
 *
 * @return {boolean}
 *   True if it's the main cell.
 */
export function removeCell(cell) {
  return !(cell.x === this.x && cell.y === this.y)
}

/**
 * @param {Array.<Object>} cell
 *   Current cell.
 *
 * @return {boolean}
 *   True if it's the neighbor cell.
 */
export function getNeighborCells(cell) {
  return cell.x <= this.x + 1
    && cell.x >= this.x - 1
    && cell.y <= this.y + 1
    && cell.y >= this.y - 1
}

/**
 * @param {Array.<Object>} cell
 *   Current cell.
 * @param {number} index
 *   Index's array.
 * @param {Array.<Object>} universe
 *   The universe.
 *
 * @return {Object}
 *   A cell alive or death.
 */
export const evolutionOfLife = (cell, index, universe) => {
  const neighborCells = universe
    .filter(getNeighborCells, cell)
    .filter(removeCell, cell)

  return { x: cell.x, y: cell.y, alive: evolutionOfCell(neighborCells, cell) }
}

/**
 * @param {number} size
 *   Size of universe.
 *
 * @return {Array.<Object>} start
 *   The fresh universe.
 */
export const makingOfUniverse = (size) => {
  const start = []

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      start.push({ x, y, alive: Math.random() >= 0.5 })
    }
  }

  return start
}
