'use strict'

import { makingOfUniverse, evolutionOfLife } from './lib'

const size = 25
let counter = 1
let start = makingOfUniverse(size)

/**
 * Show the game.
 */
const show = () => {
  const universe = start.map(evolutionOfLife)
  let line = ''

  universe.forEach((element, index) => {
    if (index !== 0 && index % size === 0) {
      line += '\n'
    }

    if (element.alive) {
      line += '0'
    }
    else {
      line += ' '
    }

    console.clear()
    process.stdout.write(line)
  })
  console.log(`\n${counter++}`)

  start = JSON.parse(JSON.stringify(universe))
}

setInterval(show, 1000)
