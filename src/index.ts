import * as fs from 'fs'
import * as pathUtils from 'path'

// Dependencies
import * as yaml from 'yaml'

export class Si18n {
  private locales: Map<string, object> = new Map()

  /**
   * Si18n initializer.
   * @param path Path to the Si18n translations.
   */
  constructor(path: fs.PathLike) {
    const files = fs.readdirSync(path, { encoding: 'utf-8' })
    for (const file of files) {
      // Skip files other than YAML documents
      if (!file.endsWith('.yml')) {
        continue
      }
      // Get filename without extension
      const localeName = file.split('.')[0]
      // Get translations object by parsing yaml
      const translationsObject = yaml.parse(
        fs.readFileSync(pathUtils.join(path.toString(), file)).toString()
      )
      // Update locales map by inserting 
      //   key == locale name
      //   value == parsed yaml document
      this.locales.set(localeName, translationsObject)
    }
  }

  /**
   * 
   * @param locale Locale where to search for translation key
   * @param key Translation key. Should look like: 'my.nested.value'
   */
  public get(locale: string, key: string) {
    const temp = key.split('.').reduce((object, key) => {
      return object && object[key]
    }, this.locales.get(locale))

    if (typeof temp === 'undefined') {
      throw Error('Invalid locale or translation key.')
    }

    return temp
  }
}