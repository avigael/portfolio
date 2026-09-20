import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from "@angular/core";

type Direction = "up" | "down" | "left" | "right";

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: "app-snake-game",
  templateUrl: "./snake-game.component.html",
  styleUrls: ["./snake-game.component.css"],
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild("board", { static: true }) board!: ElementRef<HTMLCanvasElement>;

  readonly columns = 15;
  readonly rows = 9;
  readonly cellSize = 16;

  isPlaying = false;
  isGameOver = false;
  isOpen = false;
  score = 0;

  private snake: Point[] = [];
  private food: Point = { x: 11, y: 4 };
  private direction: Direction = "right";
  private queuedDirection: Direction = "right";
  private timer: ReturnType<typeof setInterval> | null = null;

  ngAfterViewInit(): void {
    this.resetBoard();
    this.draw();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  get buttonLabel(): string {
    return this.isPlaying ? "Restart" : "Play Snake";
  }

  startGame(): void {
    this.stopTimer();
    this.resetBoard();
    this.isOpen = true;
    this.isPlaying = true;
    this.isGameOver = false;
    this.timer = setInterval(() => this.tick(), 125);
    this.draw();
  }

  closeGame(): void {
    this.stopTimer();
    this.isOpen = false;
    this.isPlaying = false;
    this.isGameOver = false;
    this.resetBoard();
    this.draw();
  }

  setDirection(direction: Direction): void {
    if (!this.isPlaying || this.isOpposite(direction, this.direction)) {
      return;
    }

    this.queuedDirection = direction;
  }

  @HostListener("window:keydown", ["$event"])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.isOpen) {
      this.closeGame();
      return;
    }

    if (!this.isPlaying) {
      return;
    }

    const directions: Record<string, Direction> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    const direction = directions[event.key];

    if (direction) {
      event.preventDefault();
      this.setDirection(direction);
    }
  }

  private resetBoard(): void {
    this.snake = [
      { x: 7, y: 4 },
      { x: 6, y: 4 },
      { x: 5, y: 4 },
    ];
    this.food = { x: 11, y: 4 };
    this.direction = "right";
    this.queuedDirection = "right";
    this.score = 0;
  }

  private tick(): void {
    this.direction = this.queuedDirection;
    const head = this.snake[0];
    const velocity = this.velocityFor(this.direction);
    const nextHead = { x: head.x + velocity.x, y: head.y + velocity.y };

    if (this.hitWall(nextHead) || this.snake.some((segment) => this.samePoint(segment, nextHead))) {
      this.endGame();
      return;
    }

    this.snake.unshift(nextHead);

    if (this.samePoint(nextHead, this.food)) {
      this.score += 1;
      this.placeFood();
    } else {
      this.snake.pop();
    }

    this.draw();
  }

  private endGame(): void {
    this.isPlaying = false;
    this.isGameOver = true;
    this.stopTimer();
    this.draw();
  }

  private placeFood(): void {
    const available: Point[] = [];

    for (let y = 0; y < this.rows; y += 1) {
      for (let x = 0; x < this.columns; x += 1) {
        const point = { x, y };
        if (!this.snake.some((segment) => this.samePoint(segment, point))) {
          available.push(point);
        }
      }
    }

    if (available.length === 0) {
      this.endGame();
      return;
    }

    this.food = available[Math.floor(Math.random() * available.length)];
  }

  private draw(): void {
    const canvas = this.board.nativeElement;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.imageSmoothingEnabled = false;
    context.fillStyle = "#09090b";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(161, 161, 170, 0.1)";
    for (let y = 0; y < this.rows; y += 1) {
      for (let x = 0; x < this.columns; x += 1) {
        context.fillRect(x * this.cellSize + 7, y * this.cellSize + 7, 2, 2);
      }
    }

    context.fillStyle = "#818cf8";
    context.fillRect(
      this.food.x * this.cellSize + 4,
      this.food.y * this.cellSize + 4,
      this.cellSize - 8,
      this.cellSize - 8,
    );

    this.snake.forEach((segment, index) => {
      context.fillStyle = index === 0 ? "#fafafa" : "#d4d4d8";
      context.fillRect(
        segment.x * this.cellSize + 2,
        segment.y * this.cellSize + 2,
        this.cellSize - 4,
        this.cellSize - 4,
      );
    });

    if (this.isGameOver) {
      context.fillStyle = "rgba(9, 9, 11, 0.78)";
      context.fillRect(0, 54, canvas.width, 36);
      context.fillStyle = "#e4e4e7";
      context.font = "600 11px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("GAME OVER", canvas.width / 2, 72);
    }
  }

  private velocityFor(direction: Direction): Point {
    const velocities: Record<Direction, Point> = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    return velocities[direction];
  }

  private hitWall(point: Point): boolean {
    return point.x < 0 || point.x >= this.columns || point.y < 0 || point.y >= this.rows;
  }

  private samePoint(first: Point, second: Point): boolean {
    return first.x === second.x && first.y === second.y;
  }

  private isOpposite(next: Direction, current: Direction): boolean {
    return (
      (next === "up" && current === "down") ||
      (next === "down" && current === "up") ||
      (next === "left" && current === "right") ||
      (next === "right" && current === "left")
    );
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
