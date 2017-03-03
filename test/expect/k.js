{
  "@weex-component/5c2b5206e3ccfe84e705e188262e29a1": {
    "ready": "function () {\n\t    return modal.toast({\n\t      'message': 'ready'\n\t    });\n\t  }",
    "data": "function () {\n\t    return {\n\t      hi: 'Hello',\n\t      name: 'Weex'\n\t    };\n\t  }",
    "template": {
      "type": "div",
      "classList": [
        "wrap"
      ],
      "children": [
        {
          "type": "text",
          "classList": [
            "text-hi"
          ],
          "attr": {
            "value": "function () {return this.hi}"
          }
        },
        {
          "type": "text",
          "classList": [
            "text-name"
          ],
          "attr": {
            "value": "function () {return this.name}"
          }
        }
      ]
    },
    "style": {
      "wrap": {
        "flexDirection": "row"
      },
      "text-hi": {
        "color": "#FF0000",
        "fontSize": 26
      },
      "text-name": {
        "color": "#008000",
        "fontSize": 26
      }
    }
  }
}