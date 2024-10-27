import { Component, Input } from '@angular/core';
import { GameState } from '../gameState.model';

@Component({
  selector: 'app-title-screen',
  standalone: true,
  imports: [],
  templateUrl: './title-screen.component.html',
  styleUrl: './title-screen.component.css'
})
export class TitleScreenComponent {

  @Input() localGameState!: any; // Declare the input property with definite assignment assertion
  imagePath ='assets/images/goglogin.png'; // Correctly reference the image
  constructor() { }

  ngOnInit() {
  }

  onStartGame() {
    this.localGameState.stage  = 2;

  }
}
