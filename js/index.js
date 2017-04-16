"use strict";

//components
var Input = React.createClass({
  displayName: "Input",

  render: function render() {
    return React.createElement(
      "div",
      { className: "input" },
      React.createElement(
        "p",
        { className: "prev" },
        this.props.prevString
      ),
      React.createElement(
        "p",
        { className: "calc" },
        this.props.calcString
      )
    );
  }
});

var Key = React.createClass({
  displayName: "Key",

  render: function render() {
    return React.createElement(
      "div",
      { className: "key", onClick: this.props.onClick },
      this.props.content
    );
  }
});

var Nums = React.createClass({
  displayName: "Nums",

  render: function render() {
    return React.createElement(
      "div",
      { className: "nums" },
      React.createElement(Key, { content: "1", onClick: this.props.Input }),
      React.createElement(Key, { content: "2", onClick: this.props.Input }),
      React.createElement(Key, { content: "3", onClick: this.props.Input }),
      React.createElement(Key, { content: "4", onClick: this.props.Input }),
      React.createElement(Key, { content: "5", onClick: this.props.Input }),
      React.createElement(Key, { content: "6", onClick: this.props.Input }),
      React.createElement(Key, { content: "7", onClick: this.props.Input }),
      React.createElement(Key, { content: "8", onClick: this.props.Input }),
      React.createElement(Key, { content: "9", onClick: this.props.Input }),
      React.createElement(Key, { content: "0", onClick: this.props.Input }),
      React.createElement(Key, { content: ".", onClick: this.props.Input }),
      React.createElement(Key, { content: "00", onClick: this.props.Input })
    );
  }
});

var Operators = React.createClass({
  displayName: "Operators",

  render: function render() {
    return React.createElement(
      "div",
      { className: "operators" },
      React.createElement(Key, { content: "+", onClick: this.props.Input }),
      React.createElement(Key, { content: "-", onClick: this.props.Input }),
      React.createElement(Key, { content: "*", onClick: this.props.Input }),
      React.createElement(Key, { content: "/", onClick: this.props.Input })
    );
  }
});

var Evals = React.createClass({
  displayName: "Evals",

  render: function render() {
    return React.createElement(
      "div",
      { className: "evals" },
      React.createElement(Key, { content: "C", onClick: this.props.clear }),
      React.createElement(Key, { content: "DEL", onClick: this.props.del }),
      React.createElement(Key, { content: "=", onClick: this.props.calc })
    );
  }
});

var Toggle = React.createClass({
  displayName: "Toggle",

  render: function render() {
    return React.createElement(
      "span",
      { className: "toggle", onClick: this.props.onClick },
      this.props.colorType
    );
  }
});

var Color = React.createClass({
  displayName: "Color",

  render: function render() {
    return React.createElement(
      "p",
      { className: "color" },
      React.createElement(Toggle, { colorType: this.props.colorType, onClick: this.props.toggle }),
      React.createElement(
        "span",
        { className: "bgc" },
        this.props.color
      ),
      React.createElement(
        "span",
        { className: "copy", style: { color: this.props.color, backgroundColor: this.props.textColor, borderColor: this.props.textColor }, onClick: this.props.copy },
        "COPY"
      )
    );
  }
});

var Keyboard = React.createClass({
  displayName: "Keyboard",

  render: function render() {
    return React.createElement(
      "div",
      { className: "keyborad" },
      React.createElement(Evals, { clear: this.props.clear, del: this.props.del, calc: this.props.calc }),
      React.createElement(
        "div",
        { className: "box" },
        React.createElement(Nums, { Input: this.props.Input }),
        React.createElement(Operators, { Input: this.props.Input }),
        React.createElement(Color, { colorType: this.props.colorType, color: this.props.color, textColor: this.props.textColor, copy: this.props.copy, toggle: this.props.toggle })
      )
    );
  }
});

// putting together
var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return {
      prevString: "",
      calcString: "",
      color: "#2abacd",
      textColor: "#fff",
      colorType: "HEX ▸"
    };
  },
  // Methods
  Input: function Input(e) {
    var string = this.state.calcString + e.target.innerHTML;
    this.setState({ calcString: string });
    this.shine();
  },
  clear: function clear() {
    this.setState({
      calcString: "",
      prevString: "" });
  },

  del: function del() {
    var string = this.state.calcString.slice(0, -1);
    this.setState({ calcString: string });
  },
  calc: function calc() {
    var result = eval(this.state.calcString),
        prev = this.state.calcString;
    this.setState({ calcString: result, prevString: prev });
  },
  hexToRgb: function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  rgbToHex: function rgbToHex(color) {
    if (color.charAt(0) === "#") {
      return color;
    }

    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return "#" + ((r.length == 1 ? "0" + r : r) + (g.length == 1 ? "0" + g : g) + (b.length == 1 ? "0" + b : b));
  },

  shine: function shine() {
    var body = document.querySelector('body'),
        color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
        rgb = this.hexToRgb(color),
        rgbColor = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")",
        colorType = this.state.colorType;

    var o = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

    o > 180 ? this.state.textColor = "#594741" : this.state.textColor = "#fff";

    colorType == "HEX ▸" ? this.setState({ color: color }) : this.setState({ color: rgbColor });
  },
  copy: function copy() {
    var copyArea = document.querySelector('.bgc'),
        range = document.createRange();
    range.selectNode(copyArea);
    window.getSelection().addRange(range);
    document.execCommand("Copy");
  },
  toggle: function toggle() {
    var color = this.state.color,
        colorType = this.state.colorType;

    if (colorType == "HEX ▸") {
      var rgb = this.hexToRgb(color),
          rgbColor = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

      this.setState({ colorType: "◂  RGB", color: rgbColor });
    } else {
      var hexColor = this.rgbToHex(color);
      this.setState({ colorType: "HEX ▸", color: hexColor });
    }
  },

  // Render app
  render: function render() {
    document.querySelector('body').style.backgroundColor = this.state.color;document.querySelector('body').style.color = this.state.textColor;

    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(Input, { prevString: this.state.prevString, calcString: this.state.calcString }),
      React.createElement(Keyboard, { Input: this.Input, colorType: this.state.colorType, color: this.state.color, textColor: this.state.textColor, copy: this.copy, toggle: this.toggle, calc: this.calc, del: this.del, clear: this.clear })
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.querySelector('body'));