/**
 * Vector2 class.
 * 
 * This vector class is based with 2 dimensions (x, y).
 */
export class Vector2 {

  public x: number;
  public y: number;

  /**
   * Creates a new vector with 2 dimensions.
   * 
   * @param x X
   * @param y Y
   */
  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public get width(): number {
    return this.x;
  }

  public get height(): number {
    return this.y;
  }
}
