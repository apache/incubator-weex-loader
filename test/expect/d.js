{
  "@weex-component/name": {
    "data": "function data() {\n\t        return {\n\t            name: ''\n\t        };\n\t    }",
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
  "@weex-component/baafe3356c8cec15bbadb56b3a43cd37": {
    "data": "function data() {\n\t    return {\n\t        name: 'Weex'\n\t    };\n\t}",
    "template": {
      "type": "div",
      "style": {
        "flexDirection": "row"
      },
      "children": [
        {
          "type": "text",
          "classList": [
            "hello"
          ],
          "attr": {
            "value": "Hello"
          }
        },
        {
          "type": "name",
          "attr": {
            "name": "function () {return this.name}"
          }
        }
      ]
    },
    "style": {
      "hello": {
        "fontSize": 26,
        "color": "#008000"
      }
    }
  }
}