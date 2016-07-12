{
  "@weex-component/75ade3685ace094b4dd3622093f2ac3e": {
    "ready": "function ready() {\n\t        modal.toast({ 'message': 'ready' });\n\t    }",
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