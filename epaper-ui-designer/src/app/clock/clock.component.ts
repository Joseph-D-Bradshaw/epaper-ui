import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  currentTimeFormatted: string

  constructor() { 
    this.currentTimeFormatted = new Date().toLocaleTimeString("en-GB").slice(0, 5)
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentTimeFormatted = new Date().toLocaleTimeString("en-GB").slice(0, 5)
    }, 1000)
  }

}
