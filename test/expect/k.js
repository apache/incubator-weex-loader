{
  "@weex-component/215a3c96c2c3802f228bf7ceec470c73": {
    "ready": "function ready() {\n\t    _modal2.default.toast({ 'message': 'ready' });\n\t}",
    "data": "function data() {\n\t    return {\n\t        hi: 'Hello',\n\t        name: 'Weex'\n\t    };\n\t}",
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