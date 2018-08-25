'use strict'

import assert from 'assert'
import * as gameOfLife from '../src/lib'

describe('La cellule', () => {
  it('naît si elle a trois voisines', () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 0, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    assert.strictEqual(gameOfLife.isBirth(state), true)
  })

  it('meurt si elle a plus de trois voisines', () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 0, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 0, y: 2, alive: true },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    assert.strictEqual(gameOfLife.isDeath(state), true)
  })

  it("meurt si elle n'a qu'une voisine", () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 0, y: 1, alive: false },
      { x: 2, y: 1, alive: false },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    assert.strictEqual(gameOfLife.isDeath(state), true)
  })

  it('évolue vers la naissance', () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 0, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    const cell = { x: 1, y: 1, alive: false }

    assert.strictEqual(gameOfLife.evolutionOfCell(state, cell), true)
  })

  it('évolue vers la mort', () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 0, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 0, y: 2, alive: true },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    const cell = { x: 1, y: 1, alive: true }

    assert.strictEqual(gameOfLife.evolutionOfCell(state, cell), false)
  })

  it("n'évolue pas", () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: false },
      { x: 0, y: 1, alive: false },
      { x: 2, y: 1, alive: false },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    const cell = { x: 1, y: 1, alive: false }

    assert.strictEqual(gameOfLife.evolutionOfCell(state, cell), false)
  })

  it('analysée est supprimée pour pouvoir compter ces voisins', () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: false },
      { x: 0, y: 1, alive: false },
      { x: 1, y: 1, alive: false },
      { x: 2, y: 1, alive: false },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    const cell = { x: 1, y: 1, alive: false }
    const stateWithoutCell = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: false },
      { x: 0, y: 1, alive: false },
      { x: 2, y: 1, alive: false },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]

    assert.strictEqual(JSON.stringify(state.filter(gameOfLife.removeCell, cell)), JSON.stringify(stateWithoutCell))
  })
})

describe('Cellules voisines :', () => {
  it('nombre vivantes', () => {
    const state = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 0, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    assert.strictEqual(gameOfLife.alivesCounter(state), 3)
  })

  it('leurs sélection dans un univers', () => {
    const universe = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: false },
      { x: 0, y: 1, alive: false },
      { x: 1, y: 1, alive: false },
      { x: 2, y: 1, alive: false },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
    ]
    const cell = { x: 0, y: 0, alive: false }
    const neighborsAndCell = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 0, y: 1, alive: false },
      { x: 1, y: 1, alive: false },
    ]

    assert.strictEqual(JSON.stringify(universe.filter(gameOfLife.getNeighborCells, cell)), JSON.stringify(neighborsAndCell))
  })
})

describe('Au jeu de la vie,', () => {
  it("évolution d'un univers", () => {
    const universe = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: true },
      { x: 2, y: 0, alive: false },
      { x: 3, y: 0, alive: false },
      { x: 4, y: 0, alive: false },
      { x: 0, y: 1, alive: true },
      { x: 1, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 3, y: 1, alive: true },
      { x: 4, y: 1, alive: true },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: false },
      { x: 3, y: 2, alive: false },
      { x: 4, y: 2, alive: false },
    ]
    const betterUniverse = [
      { x: 0, y: 0, alive: true },
      { x: 1, y: 0, alive: true },
      { x: 2, y: 0, alive: false },
      { x: 3, y: 0, alive: true },
      { x: 4, y: 0, alive: false },
      { x: 0, y: 1, alive: true },
      { x: 1, y: 1, alive: true },
      { x: 2, y: 1, alive: true },
      { x: 3, y: 1, alive: true },
      { x: 4, y: 1, alive: false },
      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: true },
      { x: 2, y: 2, alive: true },
      { x: 3, y: 2, alive: true },
      { x: 4, y: 2, alive: false },
    ]

    assert.strictEqual(JSON.stringify(universe.map(gameOfLife.evolutionOfLife)), JSON.stringify(betterUniverse))
  })
})
