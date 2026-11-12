// Собирает сайт демо для GitHub Pages в dist/demo-pages:
//   index.html — стартовая страница со ссылками (projects/demo-pages/index.html);
//   vue/, react/, angular/ — три демо, собранные под своим подпутём.
//
// Перед запуском нужен `npm run demo:bootstrap`: он собирает bx-rest и
// demo-shared и ставит зависимости демо. Так же скрипт запускает и workflow
// .github/workflows/demos.yml.
//
// Подпуть по умолчанию — /bx-rest/, как у репозитория на GitHub Pages
// (https://aricatofuka.github.io/bx-rest/). Другой: --base=/путь/.
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const out = join(repoRoot, 'dist', 'demo-pages')

const baseArg = process.argv.find(arg => arg.startsWith('--base='))
const base = (baseArg ? baseArg.slice('--base='.length) : '/bx-rest/').replace(/\/*$/, '/')
if (!base.startsWith('/')) {
  console.error(`[demo:pages] --base must start with "/", got "${base}"`)
  process.exit(1)
}

const demos = [
  { path: 'vue', dir: 'demo-vue', args: [`--base=${base}vue/`], dist: 'dist' },
  { path: 'react', dir: 'demo-react', args: [`--base=${base}react/`], dist: 'dist' },
  { path: 'angular', dir: 'demo-angular', args: ['--base-href', `${base}angular/`], dist: join('dist', 'demo-angular', 'browser') }
]

function run(args, cwd) {
  console.log(`\n[demo:pages] ${cwd.replace(repoRoot, '.')}> npm ${args.join(' ')}`)
  // shell: true нужен на Windows, где npm — это .cmd-скрипт. Аргументы —
  // фиксированные литералы и подпуть, проверенный выше.
  const result = spawnSync(['npm', ...args].join(' '), { cwd, stdio: 'inherit', shell: true })
  if (result.error || result.status !== 0) {
    console.error(`[demo:pages] Command failed in ${cwd}`, result.error ?? `(exit code ${result.status})`)
    process.exit(result.status || 1)
  }
}

for (const demo of demos) {
  if (!existsSync(join(repoRoot, 'projects', demo.dir, 'node_modules'))) {
    console.error(`[demo:pages] projects/${demo.dir} has no node_modules. Run "npm run demo:bootstrap" first.`)
    process.exit(1)
  }
}

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

for (const demo of demos) {
  const cwd = join(repoRoot, 'projects', demo.dir)
  run(['run', 'build', '--', ...demo.args], cwd)
  cpSync(join(cwd, demo.dist), join(out, demo.path), { recursive: true })
}

// Стартовая страница: подставляем версию bx-rest, из которой собраны демо.
const { version } = JSON.parse(readFileSync(join(repoRoot, 'projects', 'bx-rest', 'package.json'), 'utf8'))
const index = readFileSync(join(repoRoot, 'projects', 'demo-pages', 'index.html'), 'utf8')
writeFileSync(join(out, 'index.html'), index.replaceAll('{{version}}', version))

console.log(`\n[demo:pages] Done: ${out.replace(repoRoot, '.')} for ${base}`)
