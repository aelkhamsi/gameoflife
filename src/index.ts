import { Grid } from "./Grid";

const w = 40, h = 40

// init grid
const grid = new Uint8Array(w * h)
const glider: [number, number][] = [[5, 4], [6, 5], [4, 6], [5, 6], [6, 6]]
const rPentomino: [number, number][] = [[16, 14], [17, 14], [15, 15], [16, 15], [16, 16]]

for (const [x, y] of rPentomino) grid[y * w + x] = 1

// create game instance
const game = new Grid(w, h, grid)

async function main() {
  process.stdout.write('\x1b[2J\x1b[?25l') // clear screen, hide cursor
  setInterval(() => {
    game.step()
    game.print()
  }, 100)
}

main()
