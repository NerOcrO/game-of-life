'use strict'

import * as gameOfLife from '../lib'

describe('La cellule', () => {
  it('naît si elle a trois voisines', () => {
    // Given
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

    // When
    const birth = gameOfLife.isBirth(state)

    // Then
    expect(birth).toBe(true)
  })

  it('meurt si elle a plus de trois voisines', () => {
    // Given
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

    // When
    const death = gameOfLife.isDeath(state)

    // Then
    expect(death).toBe(true)
  })

  it("meurt si elle n'a qu'une voisine", () => {
    // Given
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

    // When
    const death = gameOfLife.isDeath(state)

    // Then
    expect(death).toBe(true)
  })

  it('évolue vers la naissance', () => {
    // Given
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

    // When
    const newCell = gameOfLife.evolutionOfCell(state, cell)

    // Then
    expect(newCell).toBe(true)
  })

  it('évolue vers la mort', () => {
    // Given
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

    // When
    const newCell = gameOfLife.evolutionOfCell(state, cell)

    // Then
    expect(newCell).toBe(false)
  })

  it("n'évolue pas", () => {
    // Given
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

    // When
    const newCell = gameOfLife.evolutionOfCell(state, cell)

    // Then
    expect(newCell).toBe(false)
  })

  it('analysée est supprimée pour pouvoir compter ces voisins', () => {
    // Given
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

    // When
    const string = JSON.stringify(state.filter(gameOfLife.removeCell, cell))

    // Then
    expect(string).toStrictEqual(JSON.stringify(stateWithoutCell))
  })
})

describe('Cellules voisines :', () => {
  it('nombre vivantes', () => {
    // Given
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

    // When
    const counter = gameOfLife.alivesCounter(state)

    // Then
    expect(counter).toBe(3)
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

    // When
    const string = JSON.stringify(universe.filter(gameOfLife.getNeighborCells, cell))

    // Then
    expect(string).toStrictEqual(JSON.stringify(neighborsAndCell))
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

    // When
    const string = JSON.stringify(universe.map(gameOfLife.evolutionOfLife))

    // Then
    expect(string).toStrictEqual(JSON.stringify(betterUniverse))
  })
})
