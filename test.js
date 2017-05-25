import execa from 'execa';
import test from 'ava';

test('test result', async t => {
    t.regex(await execa.stdout('./cli.js', ['20', 'usd', 'rub']), /\d/);
});

test('test result', async t => {
    t.regex(await execa.stdout('./cli.js', ['--help']), /CLI .+/);
});
