import { Component, inject, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import {
  applyConnection,
  EMPTY_CONNECTION,
  isConnectionValid,
  loadConnection,
  mergeSandboxResult,
  recipes,
  runSnippet,
  saveConnection,
  t,
  type Connection,
  type SandboxResult,
  type Recipe
} from 'bx-rest-demo-shared'
import { BXRestNavvy } from 'bx-rest'
import { ConnectionFormComponent } from './connection-form/connection-form.component'
import { RecipePickerComponent } from './recipe-picker/recipe-picker.component'
import { CodeEditorComponent } from './code-editor/code-editor.component'
import { ResultPanelComponent } from './result-panel/result-panel.component'
import { ToastHostComponent } from './toast-host/toast-host.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    ConnectionFormComponent,
    RecipePickerComponent,
    CodeEditorComponent,
    ResultPanelComponent,
    ToastHostComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Синглтон-клиент через DI — как в README «Использование в Angular».
  private readonly bxRest = inject(BXRestNavvy)
  readonly t = t

  connection: Connection = { ...EMPTY_CONNECTION }
  applied = false

  code = recipes[0].code
  results: SandboxResult[] = []

  ngOnInit(): void {
    const saved = loadConnection()
    if (saved) {
      this.connection = saved
      if (isConnectionValid(saved)) {
        applyConnection(saved)
        this.applied = true
      }
    }
  }

  get isValid(): boolean {
    return isConnectionValid(this.connection)
  }

  onConnectionChange(connection: Connection): void {
    this.connection = connection
  }

  connect(): void {
    if (!isConnectionValid(this.connection)) return
    applyConnection(this.connection)
    saveConnection(this.connection)
    this.applied = true
  }

  pickRecipe(recipe: Recipe): void {
    this.code = recipe.code
  }

  run(): void {
    this.results = []
    runSnippet(this.code, {
      bxRest: this.bxRest,
      onResult: result => {
        this.results = mergeSandboxResult(this.results, result)
      }
    })
  }
}
