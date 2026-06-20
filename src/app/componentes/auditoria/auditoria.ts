import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.css',
})
export class Auditoria {}
