'use strict'

import { evolutionOfLife } from './lib'

const size = 25
let start = []
let counter = 1
for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    start.push({ x, y, alive: Math.round(Math.random()) ? true : false })
  }
}
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
