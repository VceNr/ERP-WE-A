import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {}
