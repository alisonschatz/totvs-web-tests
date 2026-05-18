const bold   = s => `\x1b[1m${s}\x1b[0m`;
const green  = s => `\x1b[32m${s}\x1b[0m`;
const red    = s => `\x1b[31m${s}\x1b[0m`;
const cyan   = s => `\x1b[36m${s}\x1b[0m`;
const gray   = s => `\x1b[90m${s}\x1b[0m`;
const yellow = s => `\x1b[33m${s}\x1b[0m`;

const SUITE_MAP = {
  'api-products': 'Desafio API',
  'cart':         'Desafio 02 ',
  'registration': 'Desafio 01 ',
};

function suiteLabel(test) {
  const file = test.location?.file ?? '';
  for (const [key, label] of Object.entries(SUITE_MAP)) {
    if (file.includes(key)) return label;
  }
  return 'Suite     ';
}

function formatMs(ms) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

const divider = () => gray('─'.repeat(60));

class CleanReporter {
  constructor() {
    this.results = [];
    this.errors  = [];
    this.start   = Date.now();
  }

  onBegin(_config, suite) {
    const total = suite.allTests().length;
    console.log('');
    console.log(bold('  Automation Exercise') + gray('  ·  automationexercise.com'));
    console.log(gray(`  Playwright · Chromium · ${total} testes`));
    console.log('');
    console.log(divider());
    console.log('');
  }

  onTestEnd(test, result) {
    const passed  = result.status === 'passed';
    const skipped = result.status === 'skipped';
    const status  = passed ? green('✔') : skipped ? yellow('–') : red('✘');

    console.log(`  ${status}  ${cyan(suiteLabel(test))}  ${test.title}`);
    console.log(`     ${gray('└')} ${gray(formatMs(result.duration))}`);
    console.log('');

    this.results.push({ passed, skipped });
    if (!passed && !skipped) this.errors.push({ test, result });
  }

  onEnd() {
    const total   = this.results.length;
    const passed  = this.results.filter(r => r.passed).length;
    const failed  = this.results.filter(r => !r.passed && !r.skipped).length;
    const elapsed = formatMs(Date.now() - this.start);

    console.log(divider());
    console.log('');

    if (failed === 0) {
      console.log(`  ${green(bold(`${passed} passaram`))}  ${gray(`·  ${elapsed}  ·  ${total} testes`)}`);
    } else {
      console.log(`  ${red(bold(`${failed} falhou`))}  ${gray('·')}  ${green(`${passed} passou`)}  ${gray(`·  ${elapsed}`)}`);
    }

    for (const { test, result } of this.errors) {
      console.log('');
      console.log(divider());
      console.log('');
      console.log(`  ${red('Falha:')} ${test.title}`);
      for (const err of result.errors) {
        const lines = (err.message ?? '').split('\n').slice(0, 8);
        console.log(lines.map(l => `    ${gray(l)}`).join('\n'));
      }
    }

    console.log('');
  }
}

module.exports = CleanReporter;
