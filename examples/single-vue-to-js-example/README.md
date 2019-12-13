This example is a template using webpack and weexLoader to convert single vue file to js file.

If you want to convert vue file to js file, please follow the below steps.

### Usage

1. execute `npm install` in terminal

2. copy the vue file to current directory

3. update the content of `webpack.config.js`

   ```js
   entry: {
       '<output-filename-without-js-extension>': '<input-file-path-with-filename>?entry=true' 
     },
     output: {
       path: path.resolve(__dirname, '<output-path>')
   }
   ```

   for example, the below config convert `App.vue` to `e2e-landing.js` in current directory.

   ```javascript
   entry: {
    	// you should keep ?entry=true and you should give ./
   	'e2e-landing': './App.vue?entry=true'
   },
   output: {
   	path: path.resolve(__dirname, './')
   }
   ```

4. execute `npm run build:weex` in terminal.

5. Done! 

The output file is what you wanted.