{
  "@weex-component/name1": {
    "data": "function data() {\n\t        console.log('Name Component Comment');\n\t        return {\n\t            name: ''\n\t        };\n\t    }",
    "template": {
      "type": "div",
      "children": [
        {
          "type": "text",
          "classList": [
            "name"
          ],
          "attr": {
            "value": "function () {return this.name}"
          }
        }
      ]
    },
    "style": {
      "name": {
        "fontSize": 26,
        "color": "#FF0000"
      }
    }
  },
  "@weex-component/hi1": {
    "data": "function data() {\n\t        return {\n\t            hi: ''\n\t        };\n\t    }",
    "template": {
      "type": "div",
      "children": [
        {
          "type": "text",
          "classList": [
            "hi"
          ],
          "attr": {
            "value": "function () {return this.hi}"
          }
        }
      ]
    },
    "style": {
      "hi": {
        "fontSize": 26,
        "color": "#008000"
      }
    }
  },
  "@weex-component/ce13b953688b3be076ebafcfb5807052": {
    "data": "function data() {\n\t        return {\n\t            hi: 'Hello',\n\t            name: 'Weex'\n\t        };\n\t    }",
    "template": {
      "type": "div",
      "classList": [
        "wrap"
      ],
      "children": [
        {
          "type": "hi1",
          "attr": {
            "hi": "function () {return this.hi}"
          }
        },
        {
          "type": "name1",
          "attr": {
            "name": "function () {return this.name}"
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