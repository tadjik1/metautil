'use strict';

const fsp = require('node:fs').promises;
const metatests = require('metatests');
const metautil = require('..');
const { directoryExists, ensureDirectory } = metautil;

metatests.test('Fs: directoryExists', async (test) => {
  const exists1 = await directoryExists('./test');
  test.strictSame(exists1, true);
  const exists2 = await directoryExists('./abrvalg');
  test.strictSame(exists2, false);
  test.end();
});

metatests.test('Fs: ensureDirectory', async (test) => {
  const created1 = await ensureDirectory('./abc');
  test.strictSame(created1, true);
  const created2 = await ensureDirectory('./abc');
  test.strictSame(created2, true);
  await fsp.rmdir('./abc');
  const created3 = await ensureDirectory('./LICENSE');
  test.strictSame(created3, false);
  test.end();
});
