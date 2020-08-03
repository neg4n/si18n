const assert = require('assert')
const fs = require('fs')
const yaml = require('yaml')
const path = require('path')

const { Si18n } = require('../dist/index')

let i18n
let expected = yaml.parse(
  fs.readFileSync(path.join(__dirname, 'locale.yml')).toString()
)

describe('Si18n', () => {
  describe('#constructor()', () => {
    it('check if throws when invalid path provided', () =>
      assert.throws(() => new Si18n(__dirname + __dirname))
    )

    it('check if constructs without error', () => i18n = new Si18n(__dirname))
  })

  describe('#get()', () => {
    it('check if throws when invalid locale or translation key provided', () => {
      assert.throws(() => i18n.get('invalid', 'invalid'))
      assert.throws(() => i18n.get('locale', 'invalid'))
    })

    it('check if gets value properly', () => {
      assert.deepStrictEqual(
        i18n.get('locale', 'only'),
        expected.only
      )

      assert.deepStrictEqual(
        i18n.get('locale', 'only.for.testing'),
        expected.only.for.testing
      )

      assert.deepStrictEqual(
        i18n.get('locale', 'niceValue'),
        expected.niceValue
      )
    })
  })
})
