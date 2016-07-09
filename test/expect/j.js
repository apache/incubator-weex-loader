{
  "@weex-component/88780bcf66c93d797a309a82b762e1f9": {
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