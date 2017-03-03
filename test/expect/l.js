{
  "@weex-component/3643c01cdfdc5b2c121494d9ae9633e9": {
    "ready": "function ready() {\n\t    _modal2.default.toast({ message: this.name });\n\t}",
    "data": "function data() {\n\t    return {\n\t        name: (0, _getName2.default)()\n\t    };\n\t}",
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