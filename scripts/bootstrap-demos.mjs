// Готовит все три демо-приложения (projects/demo-angular|vue|react) к запуску:
// 1. собирает bx-rest (dist/bx-rest) — демо подключают его как file:-зависимость;
// 2. ставит зависимости и собирает projects/demo-shared (включая генерацию
//    типов bx-rest/rxjs для Monaco — см. demo-shared/scripts/generate-typings.mjs);
// 3. ставит зависимости в каждом demo-* приложении.
//
// После этого в любом из projects/demo-* можно запускать его обычный dev-скрипт
// (npm run dev для Vue/React, npm start для Angular).
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const npmCmd = 'npm'

function run(command, args, cwd) {
  console.log(`\n[demo:bootstrap] ${cwd.replace(repoRoot, '.')}> ${command} ${args.join(' ')}`)
  // shell: true нужен на Windows, где npm — это .cmd-скрипт, а не исполняемый файл.
  // Аргументы здесь — только фиксированные литералы ('run', 'build', 'install'),
  // поэтому команда собирается одной строкой, без предупреждения Node про
  // передачу args вместе с shell: true.
  const result = spawnSync([command, ...args].join(' '), { cwd, stdio: 'inherit', shell: true })
  if (result.error) {
    console.error(`[demo:bootstrap] Не удалось запустить команду в ${cwd}:`, result.error)
    process.exit(1)
  }
  if (result.status !== 0) {
    console.error(`[demo:bootstrap] Команда завершилась с ошибкой (код ${result.status}) в ${cwd}`)
    process.exit(result.status ?? 1)
  }
}

run(npmCmd, ['run', 'build'], repoRoot)

const demoShared = join(repoRoot, 'projects', 'demo-shared')
run(npmCmd, ['install'], demoShared)
run(npmCmd, ['run', 'build'], demoShared)

for (const demo of ['demo-react', 'demo-vue', 'demo-angular']) {
  run(npmCmd, ['install'], join(repoRoot, 'projects', demo))
}

console.log(
  '\n[demo:bootstrap] Готово. Дальше в любой из projects/demo-react|demo-vue|demo-angular: ' +
    '`npm run dev` (Angular — `npm start`).'
)
