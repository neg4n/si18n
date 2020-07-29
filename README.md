## si18n
__very__ simple internationalization library for node.js
```
npm install @neg4n/si18n --save
```
## How to use?
1. Create directory where translations will be located.  
   Lets assume we name it `i18n`
2. Init Si18n: 
   ```js
   const Si18n = require('@neg4n/si18n').Si18n
   const Path = require('path')
   
   const i18n = new Si18n(Path.join(__dirname, 'i18n'))
   ```
3. Everything's done! Now you can access translations by:
  - Creating `i18n/en.yml`:
```yml
sample:
  nested:
    translation: "yup..."
```
  - Printing the value:
```js
  console.log(i18n.get('en', 'sample.nested.translation'))
  // output: 'yup...'
```

