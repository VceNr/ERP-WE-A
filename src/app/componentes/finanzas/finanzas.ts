import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css',
})
export class Finanzas {}
