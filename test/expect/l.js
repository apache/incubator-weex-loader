{
  "@weex-component/77db11e29e85b11856342d968781883e": {
    "ready": "function ready() {\n\t        modal.toast({ message: this.name });\n\t    }",
    "data": "function data() {\n\t        return {\n\t            name: getName()\n\t        };\n\t    }",
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