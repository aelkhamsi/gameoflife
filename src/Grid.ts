export class Grid {
  grid: Uint8Array;

  constructor(
    public width: number = 100,
    public height: number = 100
  ) {
    this.grid = new Uint8Array(width * height);
  }

  get(x: number, y: number) {
    return this.grid[y * this.width + x]
  }

  private countNeighbors(x: number, y: number) {
    let count = 0
    for (let dx=-1; dx<=1; dx++) {
      for (let dy=-1; dy<=1; dy++) {
        if (dx === 0 && dy === 0) continue // skip center
        if (x+dx < 0 || x+dx >= this.width || y+dy < 0 || y+dy >= this.height) continue // skip out-of-bound
        count += this.get(x+dx, y+dy)
      }
    }
    return count
  }
}