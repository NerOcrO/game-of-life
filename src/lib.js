export const alivesCounter = universe => universe.filter(child => child.alive).length
export const isBirth = universe => alivesCounter(universe) === 3
export const isDeath = (universe) => {
  const alives = alivesCounter(universe)
  return alives < 2 || alives > 3
}
export const evolutionOfCell = (neighborCells, cell) => {
  let hasChanged = false

  hasChanged = cell.alive === true ? isDeath(neighborCells) : hasChanged = isBirth(neighborCells)

  return hasChanged ? !cell.alive : cell.alive
}
export function removeCell(cell) {
  return !(cell.x === this.x && cell.y === this.y)
}
export function getNeighborCells(cell) {
  return cell.x <= this.x + 1
    && cell.x >= this.x - 1
    && cell.y <= this.y + 1
    && cell.y >= this.y - 1
}
export const evolutionOfLife = (cell, index, universe) => {
  const neighborCells = universe
    .filter(getNeighborCells, cell)
    .filter(removeCell, cell)

  return { x: cell.x, y: cell.y, alive: evolutionOfCell(neighborCells, cell) }
}
