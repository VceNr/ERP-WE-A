import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './contabilidad.html',
  styleUrl: './contabilidad.css',
})
export class Contabilidad {}
