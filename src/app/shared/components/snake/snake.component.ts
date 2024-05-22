import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject, HostListener } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css'
})
export class SnakeComponent {

  //cosas echas por mi
  cuadro: any;
  cuadroId: any;
  changeDetectorRef = inject(ChangeDetectorRef)
  boardSize = 10;
  emptySquares: any = [];
  estadoJuego:boolean = false
  inicios:number = 0

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

  }

  ngOnInit(): void {

    document.addEventListener('keydown', (key)=>{

      if(this.estadoJuego) {
        switch (key.code) {
          case 'ArrowUp':
            this.direction = this.direction != 'ArrowDown' ?key.code : this.direction
            break;
          case 'ArrowDown':
            this.direction = this.direction != 'ArrowUp' ? key.code: this.direction
            break;
          case 'ArrowLeft':
            this.direction = this.direction != 'ArrowRight' ? key.code: this.direction
            break;
          case 'ArrowRight':
            this.direction = this.direction != 'ArrowLeft' ?key.code : this.direction
            break;
        }
      }
    }
      
    );

    this.cuadro = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(this.squareTypes.emptySquare));
    this.cuadroId = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(this.squareTypes.emptySquare));
    this.cuadro.forEach((row: any, rowIndex: any) => {
      row.forEach((column: any, columnndex: any) => {
        let squareValue = `${rowIndex}${columnndex}`
        this.cuadroId[rowIndex][columnndex] = squareValue
        this.emptySquares.push(squareValue)
      })
    })
  }

  // Game settings

  gameSpeed = 150;
  squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
  };
  directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
  };

  // Game variables
  snake: any;
  score: any;
  direction: any;
  boardSquares: any;
  moveInterval = Array(50);

  // --------------------aprobada por mi ---------------
  //dibuja la serpiente
  drawSnake() {
    this.snake.forEach((square: string) => this.drawSquare(square, 'snakeSquare'));
  }


  // --------------------aprobada por mi ---------------
  // Rellena cada cuadrado del tablero
  // @params 
  // square: posicion del cuadrado,
  // type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
  drawSquare = (square: any, type: string) => {
    const [row, column] = square.split('');
    let sType

    switch (type) {
      case "emptySquare":
        sType = this.squareTypes.emptySquare
        break;

      case "snakeSquare":
        sType = this.squareTypes.snakeSquare
        break;

      case "foodSquare":
        sType = this.squareTypes.foodSquare
        break;
    }
    this.cuadro[row][column] = sType
    const squareElement = document.getElementById(square);
    squareElement!.setAttribute('class', `square ${type}`);

    if (type === 'emptySquare') {
      this.emptySquares.push(square);
    } else {
      if (this.emptySquares.indexOf(square) !== -1) {
        this.emptySquares.splice(this.emptySquares.indexOf(square), 1);
      }
    }
  }

  // --------------------aprobada por mi ---------------
  //mueve la serpiente
  moveSnake = () => {


    let direccion;
    switch (this.direction) {
      case "ArrowUp":
        direccion = this.directions.ArrowUp;
        break;

      case "ArrowDown":
        direccion = this.directions.ArrowDown;
        break;

      case "ArrowRight":
        direccion = this.directions.ArrowRight;
        break;

      default:
        direccion = this.directions.ArrowLeft;
        break;
    }
    const newSquare = String(
      Number(this.snake[this.snake.length - 1]) + direccion)
      .padStart(2, '0');
    const [row, column] = newSquare.split('');


    if (parseInt(newSquare) < 0 ||
      parseInt(newSquare) > this.boardSize * this.boardSize ||
      (this.direction === 'ArrowRight' && parseInt(column) == 0) ||
      (this.direction === 'ArrowLeft' && parseInt(column) == 9 ||
        this.cuadro[row][column] === this.squareTypes.snakeSquare)) {
      this.gameOver();
    } else {
      this.snake.push(newSquare);
      if (this.cuadro[row][column] === this.squareTypes.foodSquare) {
        this.addFood();
      } else {
        const emptySquare = this.snake.shift();
        this.drawSquare(emptySquare, 'emptySquare');
      }
      this.drawSnake();
    }
  }


  // --------------------aprobada por mi ---------------
  //actualiza el score y crea otra comida random en el tablero
  addFood = () => {
    this.score++;
    this.createRandomFood();
  }


  // --------------------aprobada por mi ---------------
  //termina el juego
  gameOver = () => {
    //this.gameOverSign!.style.display = 'block'; //muestra que termino el juego
    clearInterval(this.moveInterval[this.inicios])
    this.estadoJuego=false
    this.inicios++
    //this.startButton!.disabled = false; // habilita el boton de start
  }

  // --------------------aprobada por mi ---------------
  //crea una comida randon en el tablero
  createRandomFood() {
    const randomEmptySquare = this.emptySquares[Math.floor(Math.random() * this.emptySquares.length)];
    this.drawSquare(randomEmptySquare, 'foodSquare');
  }



  //limpia el tablero de juego
  limpiarJuego(){
    this.cuadro = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(this.squareTypes.emptySquare));
    this.cuadro.forEach((row: any, rowIndex: any) => {
      row.forEach((column: any, columnndex: any) => {
        this.drawSquare(`${rowIndex}${columnndex}`,"emptySquare")
      })
    })
  }



  // --------------------aprobada por mi ---------------
  //set de parametros iniciales del juego
  setGame = () => {
    this.snake = ['00', '01', '02', '03'];
    this.score = 0;
    this.direction = 'ArrowRight';

    //this.boardSquares = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(this.squareTypes.emptySquare));
    //this.board!.innerHTML = '';
    //this.emptySquares = [];
    // this.createBoard();
  }


  // --------------------aprobada por mi ---------------
  //empieza el juego
  startGame = () => {
    this.setGame();
    this.limpiarJuego()

    // this.gameOverSign!.style.display = 'none'; //muestra el game over
    this.estadoJuego= true
    this.drawSnake();
    this.createRandomFood();
    this.moveInterval[this.inicios] = setInterval(() => this.moveSnake(), this.gameSpeed);
  }

}
