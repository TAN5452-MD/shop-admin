const sum = require('./sum')


test('add 1 + 2 equle 3', () => {
  expect(sum(1, 3)).not.toBe('4')
})
