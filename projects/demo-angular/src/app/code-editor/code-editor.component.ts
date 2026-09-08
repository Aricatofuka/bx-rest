import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MonacoEditorModule } from 'ngx-monaco-editor-v2'
import { DEFAULT_EDITOR_OPTIONS } from 'bx-rest-demo-shared'

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [FormsModule, MonacoEditorModule],
  template: `
    <ngx-monaco-editor
      style="height: 360px; display: block"
      [options]="editorOptions"
      [ngModel]="value"
      (ngModelChange)="valueChange.emit($event)"
    ></ngx-monaco-editor>
  `
})
export class CodeEditorComponent {
  @Input({ required: true }) value = ''
  @Output() valueChange = new EventEmitter<string>()

  // ngx-monaco-editor-v2 принимает options как обычный объект monaco-editor —
  // те же значения, что и в React/Vue-демо (DEFAULT_EDITOR_OPTIONS).
  readonly editorOptions = { ...DEFAULT_EDITOR_OPTIONS, language: 'typescript', theme: 'vs-dark' }
}
