{
  "@weex-component/wxc-button": {
    "data": "function () {return {\n\t    type: 'default',\n\t    size: 'large',\n\t    value: ''\n\t  }}",
    "methods": {},
    "template": {
      "type": "div",
      "classList": "function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]}",
      "children": [
        {
          "type": "text",
          "classList": "function () {return ['btn-txt', 'btn-txt-' + (this.type), 'btn-txt-sz-' + (this.size)]}",
          "attr": {
            "value": "function () {return this.value}"
          }
        }
      ]
    },
    "style": {
      "btn": {
        "marginBottom": 0,
        "alignItems": "center",
        "justifyContent": "center",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderColor": "#333333"
      },
      "btn-default": {
        "color": "rgb(51,51,51)"
      },
      "btn-primary": {
        "backgroundColor": "rgb(40,96,144)",
        "borderColor": "rgb(40,96,144)"
      },
      "btn-success": {
        "backgroundColor": "rgb(92,184,92)",
        "borderColor": "rgb(76,174,76)"
      },
      "btn-info": {
        "backgroundColor": "rgb(91,192,222)",
        "borderColor": "rgb(70,184,218)"
      },
      "btn-warning": {
        "backgroundColor": "rgb(240,173,78)",
        "borderColor": "rgb(238,162,54)"
      },
      "btn-danger": {
        "backgroundColor": "rgb(217,83,79)",
        "borderColor": "rgb(212,63,58)"
      },
      "btn-link": {
        "borderColor": "rgba(0,0,0,0)",
        "borderRadius": 0
      },
      "btn-txt-default": {
        "color": "rgb(51,51,51)"
      },
      "btn-txt-primary": {
        "color": "rgb(255,255,255)"
      },
      "btn-txt-success": {
        "color": "rgb(255,255,255)"
      },
      "btn-txt-info": {
        "color": "rgb(255,255,255)"
      },
      "btn-txt-warning": {
        "color": "rgb(255,255,255)"
      },
      "btn-txt-danger": {
        "color": "rgb(255,255,255)"
      },
      "btn-txt-link": {
        "color": "rgb(51,122,183)"
      },
      "btn-sz-large": {
        "width": 300,
        "height": 100,
        "paddingTop": 25,
        "paddingBottom": 25,
        "paddingLeft": 40,
        "paddingRight": 40,
        "borderRadius": 15
      },
      "btn-sz-middle": {
        "width": 240,
        "height": 80,
        "paddingTop": 15,
        "paddingBottom": 15,
        "paddingLeft": 30,
        "paddingRight": 30,
        "borderRadius": 10
      },
      "btn-sz-small": {
        "width": 170,
        "height": 60,
        "paddingTop": 12,
        "paddingBottom": 12,
        "paddingLeft": 25,
        "paddingRight": 25,
        "borderRadius": 7
      },
      "btn-txt-sz-large": {
        "fontSize": 45
      },
      "btn-txt-sz-middle": {
        "fontSize": 35
      },
      "btn-txt-sz-small": {
        "fontSize": 30
      }
    }
  },
  "@weex-component/wxc-hn": {
    "data": "function () {return {\n\t    level: 1,\n\t    value: ''\n\t  }}",
    "methods": {},
    "template": {
      "type": "div",
      "classList": "function () {return ['h' + (this.level)]}",
      "style": {
        "justifyContent": "center"
      },
      "children": [
        {
          "type": "text",
          "classList": "function () {return ['txt-h' + (this.level)]}",
          "attr": {
            "value": "function () {return this.value}"
          }
        }
      ]
    },
    "style": {
      "h1": {
        "height": 110,
        "paddingTop": 20,
        "paddingBottom": 20
      },
      "h2": {
        "height": 110,
        "paddingTop": 20,
        "paddingBottom": 20
      },
      "h3": {
        "height": 110,
        "paddingTop": 20,
        "paddingBottom": 20
      },
      "txt-h1": {
        "fontSize": 70
      },
      "txt-h2": {
        "fontSize": 52
      },
      "txt-h3": {
        "fontSize": 42
      }
    }
  },
  "@weex-component/wxc-list-item": {
    "data": "function () {return {\n\t    bgColor: '#ffffff'\n\t  }}",
    "methods": {
      "touchstart": "function touchstart() {}",
      "touchend": "function touchend() {}"
    },
    "template": {
      "type": "div",
      "classList": [
        "item"
      ],
      "events": {
        "touchstart": "touchstart",
        "touchend": "touchend"
      },
      "style": {
        "backgroundColor": "function () {return this.bgColor}"
      },
      "children": [
        {
          "type": "content"
        }
      ]
    },
    "style": {
      "item": {
        "paddingTop": 25,
        "paddingBottom": 25,
        "paddingLeft": 35,
        "paddingRight": 35,
        "height": 160,
        "justifyContent": "center",
        "borderBottomWidth": 1,
        "borderColor": "#dddddd"
      }
    }
  },
  "@weex-component/wxc-panel": {
    "data": "function () {return {\n\t    type: 'default',\n\t    title: '',\n\t    paddingBody: 20,\n\t    paddingHead: 20,\n\t    dataClass: '',\n\t    border: 0\n\t  }}",
    "ready": "function ready() {}",
    "template": {
      "type": "div",
      "classList": "function () {return ['panel', 'panel-' + (this.type)]}",
      "style": {
        "borderWidth": "function () {return this.border}"
      },
      "children": [
        {
          "type": "text",
          "classList": "function () {return ['panel-header', 'panel-header-' + (this.type)]}",
          "style": {
            "paddingTop": "function () {return this.paddingHead}",
            "paddingBottom": "function () {return this.paddingHead}",
            "paddingLeft": "function () {return this.paddingHead*1.5}",
            "paddingRight": "function () {return this.paddingHead*1.5}"
          },
          "attr": {
            "value": "function () {return this.title}"
          }
        },
        {
          "type": "div",
          "classList": "function () {return ['panel-body', 'panel-body-' + (this.type)]}",
          "style": {
            "paddingTop": "function () {return this.paddingBody}",
            "paddingBottom": "function () {return this.paddingBody}",
            "paddingLeft": "function () {return this.paddingBody*1.5}",
            "paddingRight": "function () {return this.paddingBody*1.5}"
          },
          "children": [
            {
              "type": "content"
            }
          ]
        }
      ]
    },
    "style": {
      "panel": {
        "marginBottom": 20,
        "backgroundColor": "#ffffff",
        "borderColor": "#dddddd",
        "borderWidth": 1
      },
      "panel-primary": {
        "borderColor": "rgb(40,96,144)"
      },
      "panel-success": {
        "borderColor": "rgb(76,174,76)"
      },
      "panel-info": {
        "borderColor": "rgb(70,184,218)"
      },
      "panel-warning": {
        "borderColor": "rgb(238,162,54)"
      },
      "panel-danger": {
        "borderColor": "rgb(212,63,58)"
      },
      "panel-header": {
        "backgroundColor": "#f5f5f5",
        "fontSize": 40,
        "color": "#333333"
      },
      "panel-header-primary": {
        "backgroundColor": "rgb(40,96,144)",
        "color": "#ffffff"
      },
      "panel-header-success": {
        "backgroundColor": "rgb(92,184,92)",
        "color": "#ffffff"
      },
      "panel-header-info": {
        "backgroundColor": "rgb(91,192,222)",
        "color": "#ffffff"
      },
      "panel-header-warning": {
        "backgroundColor": "rgb(240,173,78)",
        "color": "#ffffff"
      },
      "panel-header-danger": {
        "backgroundColor": "rgb(217,83,79)",
        "color": "#ffffff"
      },
      "panel-body": {}
    }
  },
  "@weex-component/wxc-tip": {
    "data": "function () {return {\n\t    type: 'success',\n\t    value: ''\n\t  }}",
    "template": {
      "type": "div",
      "classList": "function () {return ['tip', 'tip-' + (this.type)]}",
      "children": [
        {
          "type": "text",
          "classList": "function () {return ['tip-txt', 'tip-txt-' + (this.type)]}",
          "attr": {
            "value": "function () {return this.value}"
          }
        }
      ]
    },
    "style": {
      "tip": {
        "paddingLeft": 36,
        "paddingRight": 36,
        "paddingTop": 36,
        "paddingBottom": 36,
        "borderRadius": 10
      },
      "tip-txt": {
        "fontSize": 28
      },
      "tip-success": {
        "backgroundColor": "#dff0d8",
        "borderColor": "#d6e9c6"
      },
      "tip-txt-success": {
        "color": "#3c763d"
      },
      "tip-info": {
        "backgroundColor": "#d9edf7",
        "borderColor": "#bce8f1"
      },
      "tip-txt-info": {
        "color": "#31708f"
      },
      "tip-warning": {
        "backgroundColor": "#fcf8e3",
        "borderColor": "#faebcc"
      },
      "tip-txt-warning": {
        "color": "#8a6d3b"
      },
      "tip-danger": {
        "backgroundColor": "#f2dede",
        "borderColor": "#ebccd1"
      },
      "tip-txt-danger": {
        "color": "#a94442"
      }
    }
  },
  "@weex-component/wxc-countdown": {
    "data": "function () {return {\n\t        now: 0,\n\t        remain: 0,\n\t        time: {\n\t            elapse: 0,\n\t            D: '0',\n\t            DD: '0',\n\t            h: '0',\n\t            hh: '00',\n\t            H: '0',\n\t            HH: '0',\n\t            m: '0',\n\t            mm: '00',\n\t            M: '0',\n\t            MM: '0',\n\t            s: '0',\n\t            ss: '00',\n\t            S: '0',\n\t            SS: '0'\n\t        },\n\t        outofview: false\n\t    }}",
    "ready": "function ready() {\n\t        if (this.remain <= 0) {\n\t            return;\n\t        }\n\t\n\t        this.now = Date.now();\n\t        this.nextTick();\n\t    }",
    "methods": {
      "nextTick": "function nextTick() {\n\t            if (this.outofview) {\n\t                setTimeout(this.nextTick.bind(this), 1000);\n\t            } else {\n\t                this.time.elapse = parseInt((Date.now() - this.now) / 1000);\n\t\n\t                if (this.calc()) {\n\t                    this.$emit('tick', (0, _assign2.default)({}, this.time));\n\t                    setTimeout(this.nextTick.bind(this), 1000);\n\t                } else {\n\t                    this.$emit('alarm', (0, _assign2.default)({}, this.time));\n\t                }\n\t                this._app.updateActions();\n\t            }\n\t        }",
      "format": "function format(str) {\n\t            if (str.length >= 2) {\n\t                return str;\n\t            } else {\n\t                return '0' + str;\n\t            }\n\t        }",
      "calc": "function calc() {\n\t            var remain = this.remain - this.time.elapse;\n\t            if (remain < 0) {\n\t                remain = 0;\n\t            }\n\t            this.time.D = String(parseInt(remain / 86400));\n\t            this.time.DD = this.format(this.time.D);\n\t            this.time.h = String(parseInt((remain - parseInt(this.time.D) * 86400) / 3600));\n\t            this.time.hh = this.format(this.time.h);\n\t            this.time.H = String(parseInt(remain / 3600));\n\t            this.time.HH = this.format(this.time.H);\n\t            this.time.m = String(parseInt((remain - parseInt(this.time.H) * 3600) / 60));\n\t            this.time.mm = this.format(this.time.m);\n\t            this.time.M = String(parseInt(remain / 60));\n\t            this.time.MM = this.format(this.time.M);\n\t            this.time.s = String(remain - parseInt(this.time.M) * 60);\n\t            this.time.ss = this.format(this.time.s);\n\t            this.time.S = String(remain);\n\t            this.time.SS = this.format(this.time.S);\n\t\n\t            return remain > 0;\n\t        }",
      "appeared": "function appeared() {\n\t            this.outofview = false;\n\t        }",
      "disappeared": "function disappeared() {\n\t            this.outofview = true;\n\t        }"
    },
    "template": {
      "type": "div",
      "style": {
        "overflow": "hidden",
        "flexDirection": "row"
      },
      "events": {
        "appear": "appeared",
        "disappear": "disappeared"
      },
      "children": [
        {
          "type": "content"
        }
      ]
    },
    "style": {
      "wrap": {
        "overflow": "hidden"
      }
    }
  },
  "@weex-component/wxc-marquee": {
    "data": "function () {return {\n\t        step: 0,\n\t        count: 0,\n\t        index: 1,\n\t        duration: 0,\n\t        interval: 0,\n\t        outofview: false\n\t    }}",
    "ready": "function ready() {\n\t        if (this.interval > 0 && this.step > 0 && this.duration > 0) {\n\t            this.nextTick();\n\t        }\n\t    }",
    "methods": {
      "nextTick": "function nextTick() {\n\t            var self = this;\n\t            if (this.outofview) {\n\t                setTimeout(self.nextTick.bind(self), self.interval);\n\t            } else {\n\t                setTimeout(function () {\n\t                    self.animation(self.nextTick.bind(self));\n\t                }, self.interval);\n\t            }\n\t        }",
      "animation": "function animation(cb) {\n\t            var self = this;\n\t            var offset = -self.step * self.index;\n\t            var $animation = __weex_require__('@weex-module/animation');\n\t            $animation.transition(this.$el('anim'), {\n\t                styles: {\n\t                    transform: 'translateY(' + String(offset) + 'px) translateZ(0)'\n\t                },\n\t                timingFunction: 'ease',\n\t                duration: self.duration\n\t            }, function () {\n\t                self.index = (self.index + 1) % self.count;\n\t                self.$emit('change', {\n\t                    index: self.index,\n\t                    count: self.count\n\t                });\n\t                cb && cb();\n\t            });\n\t        }",
      "appeared": "function appeared() {\n\t            this.outofview = false;\n\t        }",
      "disappeared": "function disappeared() {\n\t            this.outofview = true;\n\t        }"
    },
    "template": {
      "type": "div",
      "classList": [
        "wrap"
      ],
      "events": {
        "appear": "appeared",
        "disappear": "disappeared"
      },
      "children": [
        {
          "type": "div",
          "id": "anim",
          "classList": [
            "anim"
          ],
          "children": [
            {
              "type": "content"
            }
          ]
        }
      ]
    },
    "style": {
      "wrap": {
        "overflow": "hidden",
        "position": "relative"
      },
      "anim": {
        "flexDirection": "column",
        "position": "absolute",
        "transform": "translateY(0) translateZ(0)"
      }
    }
  },
  "@weex-component/wxc-navbar": {
    "data": "function () {return {\n\t    dataRole: 'navbar',\n\t\n\t    backgroundColor: 'black',\n\t\n\t    height: 88,\n\t\n\t    title: \"\",\n\t\n\t    titleColor: 'black',\n\t\n\t    rightItemSrc: '',\n\t\n\t    rightItemTitle: '',\n\t\n\t    rightItemColor: 'black',\n\t\n\t    leftItemSrc: '',\n\t\n\t    leftItemTitle: '',\n\t\n\t    leftItemColor: 'black'\n\t  }}",
    "methods": {
      "onclickrightitem": "function onclickrightitem(e) {\n\t      this.$dispatch('naviBar.rightItem.click', {});\n\t    }",
      "onclickleftitem": "function onclickleftitem(e) {\n\t      this.$dispatch('naviBar.leftItem.click', {});\n\t    }"
    },
    "template": {
      "type": "div",
      "classList": [
        "container"
      ],
      "style": {
        "height": "function () {return this.height}",
        "backgroundColor": "function () {return this.backgroundColor}"
      },
      "attr": {
        "dataRole": "function () {return this.dataRole}"
      },
      "children": [
        {
          "type": "text",
          "classList": [
            "right-text"
          ],
          "style": {
            "color": "function () {return this.rightItemColor}"
          },
          "attr": {
            "naviItemPosition": "right",
            "value": "function () {return this.rightItemTitle}"
          },
          "shown": "function () {return !this.rightItemSrc}",
          "events": {
            "click": "onclickrightitem"
          }
        },
        {
          "type": "image",
          "classList": [
            "right-image"
          ],
          "attr": {
            "naviItemPosition": "right",
            "src": "function () {return this.rightItemSrc}"
          },
          "shown": "function () {return this.rightItemSrc}",
          "events": {
            "click": "onclickrightitem"
          }
        },
        {
          "type": "text",
          "classList": [
            "left-text"
          ],
          "style": {
            "color": "function () {return this.leftItemColor}"
          },
          "attr": {
            "naviItemPosition": "left",
            "value": "function () {return this.leftItemTitle}"
          },
          "shown": "function () {return !this.leftItemSrc}",
          "events": {
            "click": "onclickleftitem"
          }
        },
        {
          "type": "image",
          "classList": [
            "left-image"
          ],
          "attr": {
            "naviItemPosition": "left",
            "src": "function () {return this.leftItemSrc}"
          },
          "shown": "function () {return this.leftItemSrc}",
          "events": {
            "click": "onclickleftitem"
          }
        },
        {
          "type": "text",
          "classList": [
            "center-text"
          ],
          "style": {
            "color": "function () {return this.titleColor}"
          },
          "attr": {
            "naviItemPosition": "center",
            "value": "function () {return this.title}"
          }
        }
      ]
    },
    "style": {
      "container": {
        "flexDirection": "row",
        "position": "fixed",
        "top": 0,
        "left": 0,
        "right": 0,
        "width": 750
      },
      "right-text": {
        "position": "absolute",
        "bottom": 28,
        "right": 32,
        "textAlign": "right",
        "fontSize": 32,
        "fontFamily": "'Open Sans', sans-serif"
      },
      "left-text": {
        "position": "absolute",
        "bottom": 28,
        "left": 32,
        "textAlign": "left",
        "fontSize": 32,
        "fontFamily": "'Open Sans', sans-serif"
      },
      "center-text": {
        "position": "absolute",
        "bottom": 25,
        "left": 172,
        "right": 172,
        "textAlign": "center",
        "fontSize": 36,
        "fontWeight": "bold"
      },
      "left-image": {
        "position": "absolute",
        "bottom": 20,
        "left": 28,
        "width": 50,
        "height": 50
      },
      "right-image": {
        "position": "absolute",
        "bottom": 20,
        "right": 28,
        "width": 50,
        "height": 50
      }
    }
  },
  "@weex-component/wxc-navpage": {
    "data": "function () {return {\n\t    dataRole: 'navbar',\n\t    backgroundColor: 'black',\n\t    height: 88,\n\t    title: \"\",\n\t    titleColor: 'black',\n\t    rightItemSrc: '',\n\t    rightItemTitle: '',\n\t    rightItemColor: 'black',\n\t    leftItemSrc: '',\n\t    leftItemTitle: '',\n\t    leftItemColor: 'black'\n\t  }}",
    "template": {
      "type": "div",
      "classList": [
        "wrapper"
      ],
      "children": [
        {
          "type": "wxc-navbar",
          "attr": {
            "dataRole": "function () {return this.dataRole}",
            "height": "function () {return this.height}",
            "backgroundColor": "function () {return this.backgroundColor}",
            "title": "function () {return this.title}",
            "titleColor": "function () {return this.titleColor}",
            "leftItemSrc": "function () {return this.leftItemSrc}",
            "leftItemTitle": "function () {return this.leftItemTitle}",
            "leftItemColor": "function () {return this.leftItemColor}",
            "rightItemSrc": "function () {return this.rightItemSrc}",
            "rightItemTitle": "function () {return this.rightItemTitle}",
            "rightItemColor": "function () {return this.rightItemColor}"
          }
        },
        {
          "type": "div",
          "classList": [
            "wrapper"
          ],
          "style": {
            "marginTop": "function () {return this.height}"
          },
          "children": [
            {
              "type": "content"
            }
          ]
        }
      ]
    },
    "style": {
      "wrapper": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "width": 750
      }
    }
  },
  "@weex-component/wxc-tabitem": {
    "data": "function () {return {\n\t    index: 0,\n\t    title: '',\n\t    titleColor: '#000000',\n\t    icon: '',\n\t    backgroundColor: '#ffffff'\n\t  }}",
    "methods": {
      "onclickitem": "function onclickitem(e) {\n\t      var vm = this;\n\t      var params = {\n\t        index: vm.index\n\t      };\n\t      vm.$dispatch('tabItem.onClick', params);\n\t    }"
    },
    "template": {
      "type": "div",
      "classList": [
        "container"
      ],
      "style": {
        "backgroundColor": "function () {return this.backgroundColor}"
      },
      "events": {
        "click": "onclickitem"
      },
      "children": [
        {
          "type": "image",
          "classList": [
            "top-line"
          ],
          "attr": {
            "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
          }
        },
        {
          "type": "image",
          "classList": [
            "tab-icon"
          ],
          "attr": {
            "src": "function () {return this.icon}"
          }
        },
        {
          "type": "text",
          "classList": [
            "tab-text"
          ],
          "style": {
            "color": "function () {return this.titleColor}"
          },
          "attr": {
            "value": "function () {return this.title}"
          }
        }
      ]
    },
    "style": {
      "container": {
        "flex": 1,
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "height": 88
      },
      "top-line": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "right": 0,
        "height": 2
      },
      "tab-icon": {
        "marginTop": 5,
        "width": 40,
        "height": 40
      },
      "tab-text": {
        "marginTop": 5,
        "textAlign": "center",
        "fontSize": 20
      }
    }
  },
  "@weex-component/wxc-tabbar": {
    "data": "function () {return {\n\t    tabItems: [],\n\t    selectedIndex: 0,\n\t    selectedColor: '#ff0000',\n\t    unselectedColor: '#000000'\n\t  }}",
    "created": "function created() {\n\t    this.selected(this.selectedIndex);\n\t\n\t    this.$on('tabItem.onClick', function (e) {\n\t      var detail = e.detail;\n\t      this.selectedIndex = detail.index;\n\t      this.selected(detail.index);\n\t\n\t      var params = {\n\t        index: detail.index\n\t      };\n\t      this.$dispatch('tabBar.onClick', params);\n\t    });\n\t  }",
    "methods": {
      "selected": "function selected(index) {\n\t      for (var i = 0; i < this.tabItems.length; i++) {\n\t        var tabItem = this.tabItems[i];\n\t        if (i == index) {\n\t          tabItem.icon = tabItem.selectedImage;\n\t          tabItem.titleColor = this.selectedColor;\n\t          tabItem.visibility = 'visible';\n\t        } else {\n\t          tabItem.icon = tabItem.image;\n\t          tabItem.titleColor = this.unselectedColor;\n\t          tabItem.visibility = 'hidden';\n\t        }\n\t      }\n\t    }"
    },
    "template": {
      "type": "div",
      "classList": [
        "wrapper"
      ],
      "children": [
        {
          "type": "embed",
          "classList": [
            "content"
          ],
          "style": {
            "visibility": "function () {return this.visibility}"
          },
          "repeat": "function () {return this.tabItems}",
          "attr": {
            "src": "function () {return this.src}",
            "type": "weex"
          }
        },
        {
          "type": "div",
          "classList": [
            "tabbar"
          ],
          "append": "tree",
          "children": [
            {
              "type": "wxc-tabitem",
              "repeat": "function () {return this.tabItems}",
              "attr": {
                "index": "function () {return this.index}",
                "icon": "function () {return this.icon}",
                "title": "function () {return this.title}",
                "titleColor": "function () {return this.titleColor}"
              }
            }
          ]
        }
      ]
    },
    "style": {
      "wrapper": {
        "width": 750,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0
      },
      "content": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "marginTop": 0,
        "marginBottom": 88
      },
      "tabbar": {
        "flexDirection": "row",
        "position": "fixed",
        "bottom": 0,
        "left": 0,
        "right": 0,
        "height": 88
      }
    }
  },
  "@weex-component/example-list-item": {
    "data": "function () {return {\n\t    title: '',\n\t    url: ''\n\t  }}",
    "methods": {
      "redirect": "function redirect() {\n\t      this.$openURL(this.url);\n\t    }"
    },
    "template": {
      "type": "wxc-list-item",
      "events": {
        "click": "redirect"
      },
      "children": [
        {
          "type": "text",
          "classList": [
            "item-txt"
          ],
          "attr": {
            "value": "function () {return this.title}"
          }
        }
      ]
    },
    "style": {
      "item-txt": {
        "fontSize": 48,
        "color": "#555555"
      }
    }
  },
  "@weex-component/example-list": {
    "data": "function () {return {\n\t    root: '',\n\t    items: [{ name: 'hello', title: 'Hello World', url: '' }]\n\t  }}",
    "created": "function created() {\n\t    var bundleUrl = this.$getConfig().bundleUrl;\n\t    console.log('hit', bundleUrl);\n\t    var dirs = this.root.split('/');\n\t    dirs.forEach(function (dir, index) {\n\t      if (!dir) dirs.splice(index, 1);\n\t    });\n\t    var root = dirs.length > 0 ? dirs[0] : '';\n\t    var subRoot = dirs.length > 1 ? dirs.slice(1).join('/') + '/' : '';\n\t\n\t    var nativeBase;\n\t    var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;\n\t    var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;\n\t    if (isAndroidAssets) {\n\t      nativeBase = 'file://assets/';\n\t    } else if (isiOSAssets) {\n\t      nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);\n\t    } else {\n\t      var host = 'localhost:12580';\n\t      var matches = /\\/\\/([^\\/]+?)\\//.exec(this.$getConfig().bundleUrl);\n\t      if (matches && matches.length >= 2) {\n\t        host = matches[1];\n\t      }\n\t      nativeBase = '//' + host + '/' + root + '/build/' + subRoot;\n\t    }\n\t    var h5Base = './index.html?page=./' + root + '/build/' + subRoot;\n\t\n\t    var base = nativeBase;\n\t    if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object') {\n\t      base = h5Base;\n\t    }\n\t\n\t    for (var i in this.items) {\n\t      var item = this.items[i];\n\t      if (!item.url) {\n\t        item.url = base + item.name + '.js';\n\t      }\n\t    }\n\t\n\t    if (this.items.length) console.log('hit', this.items[0].url);\n\t  }",
    "template": {
      "type": "list",
      "children": [
        {
          "type": "cell",
          "append": "tree",
          "repeat": "function () {return this.items}",
          "children": [
            {
              "type": "example-list-item",
              "attr": {
                "title": "function () {return this.title}",
                "url": "function () {return this.url}"
              }
            }
          ]
        }
      ]
    },
    "style": {}
  },
  "@weex-component/ff1b948d57ece2a9e61ad75680c9e80e": {
    "data": "function () {return {\n\t    root: 'examples',\n\t    items: [{ name: 'hello', title: 'Hello World' }, { name: 'syntax/index', title: 'More Syntax' }, { name: 'style/index', title: 'Common Style' }, { name: 'animation', title: 'Animation' }, { name: 'component/text-demo', title: 'Text' }, { name: 'component/image-demo', title: 'Image' }, { name: 'component/input-demo', title: 'Input' }, { name: 'component/scroller-demo', title: 'Scroller' }, { name: 'component/list/list-basic', title: 'List (Basic)' }, { name: 'component/list/list-demo', title: 'List (Advanced)' }, { name: 'component/slider/index', title: 'Slider' }, { name: 'component/a-demo', title: 'A' }, { name: 'component/video-demo', title: 'Video' }, { name: 'component/countdown-demo', title: 'Countdown' }, { name: 'component/marquee-demo', title: 'Marquee' }, { name: 'component/web-demo', title: 'Web' }, { name: 'component/navigator-demo', title: 'Navigator' }, { name: 'component/tabbar/tabbar-demo', title: 'Tabbar' }, { name: 'component/process-bar-demo', title: 'ProcessBar' }, { name: 'module/instance-api', title: 'Instance API' }, { name: 'module/modal', title: 'Modal' }, { name: 'module/stream-demo', title: 'Stream' }, { name: 'module/storage-demo', title: 'Storage' }, { name: 'showcase/new-fashion/index', title: 'Activity' }, { name: 'showcase/calculator', title: 'Calculator' }, { name: 'showcase/minesweeper', title: 'Minesweeper' }, { name: 'showcase/ui', title: 'UI Gallery' }, { name: 'showcase/dropdown/dropdown-demo', title: 'Dropdown' }]\n\t  }}",
    "template": {
      "type": "example-list",
      "attr": {
        "items": "function () {return this.items}",
        "root": "function () {return this.root}"
      }
    }
  }
}