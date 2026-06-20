import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class Proyectos {}
