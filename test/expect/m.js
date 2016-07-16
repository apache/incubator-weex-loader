{
  "@weex-component/toast": {},
  "@weex-component/27bd9f030aa3c2c01f3168b3f623e61e": {
    "ready": "function ready() {\n\t        (0, _toast2.default)(this.name);\n\t    }",
    "data": "function data() {\n\t        return {\n\t            name: 'Weex'\n\t        };\n\t    }",
    "template": {
      "type": "div",
      "children": [
        {
          "type": "text",
          "classList": [
            "hello"
          ],
          "attr": {
            "value": "function () {return 'Hello ' + (this.name)}"
          }
        }
      ]
    },
    "style": {
      "hello": {
        "fontSize": 26,
        "color": "#FF0000"
      }
    }
  }
}