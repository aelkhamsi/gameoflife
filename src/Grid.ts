export class Grid {
  grid: Uint8Array;
  virtualGrid: Uint8Array;

  constructor(
    public width: number = 100,
    public height: number = 100,
    public initGrid?: Uint8Array
  ) {
    this.grid = initGrid ?? new Uint8Array(width * height);
    this.virtualGrid = new Uint8Array(this.grid);
  }

  get(x: number, y: number) {
    return this.grid[y * this.width + x]
  }

  set(x: number, y: number, value: number) {
    if (this.isOutOfBounds(x, y)) return
    this.grid[y * this.width + x] = value
  }

  private setVirtual(x: number, y: number, value: number) {
    if (this.isOutOfBounds(x, y)) return
    this.virtualGrid[y * this.width + x] = value
  }

  private isOutOfBounds(x: number, y: number) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height
  }

  private countNeighbors(x: number, y: number) {
    let count = 0
    for (let dy=-1; dy<=1; dy++) {
      for (let dx=-1; dx<=1; dx++) {
        if (dx === 0 && dy === 0) continue // skip center
        if (this.isOutOfBounds(x+dx, y+dy)) continue // skip out-of-bound

        count += this.get(x+dx, y+dy)
      }
    }
    return count
  }

  private applyRules(x: number, y: number) {
    const state = this.get(x, y)
    const neighborsCount = this.countNeighbors(x, y)
    
    if (state === 1 && (neighborsCount <= 1 || neighborsCount >= 4)) {
      this.setVirtual(x, y, 0)
    }

    if (state === 0 && neighborsCount === 3) {
      this.setVirtual(x, y, 1)
    }
  }

  step() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.applyRules(x, y)
      }
    }

    this.grid = new Uint8Array(this.virtualGrid)
  }

  print() {
    let out = ''
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        out += this.grid[y * this.width + x] ? '#' : '.'
        if (x < this.width - 1) out += ' '
      }
      out += '\n'
    }
    process.stdout.write('\x1b[H' + out) // cursor to top-left, overwrite
  }
}