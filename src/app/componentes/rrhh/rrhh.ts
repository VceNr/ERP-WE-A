import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-rrhh',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './rrhh.html',
  styleUrl: './rrhh.css',
})
export class Rrhh {}
