{
  "@weex-component/b647baac68c9fbcad4d13e5569b293d4": {
    "ready": "function ready() {\n\t        _modal2.default.toast({ 'message': 'ready' });\n\t    }",
    "data": "function data() {\n\t        return {\n\t            hi: 'Hello',\n\t            name: 'Weex'\n\t        };\n\t    }",
    "template": {
      "type": "div",
      "classList": [
        "wrap"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "function () {return this.hi}"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": "function () {return this.name}"
          }
        }
      ]
    },
    "style": {
      "wrap": {
        "flexDirection": "row"
      }
    }
  }
}