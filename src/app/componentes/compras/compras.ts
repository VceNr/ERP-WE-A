import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './compras.html',
  styleUrl: './compras.css',
})
export class Compras {}
