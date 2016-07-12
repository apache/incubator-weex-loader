{
  "@weex-component/toast": {},
  "@weex-component/7c847f2d41c5dec61fa7b99a8ec828c7": {
    "ready": "function ready() {\n\t        toast(this.name);\n\t    }",
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