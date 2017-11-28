import exclame from '../exclame';

test('exclame', () => {
  const data = 'Hello, my friend';
  const expected = 'Hello, my friend!';

  expect(exclame(data)).toEqual(expected);
});
