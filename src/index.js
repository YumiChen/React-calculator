import React, {Component} from "react";
import {render} from "react-dom";

import "./assets/stylesheets/style.sass";

//components
const Input = props=>{
    return (
    <div className="input">
    <p className="prev">{props.prevString}</p>
    <p className="calc"><span>{props.calcString}</span></p>
      </div>
    );
  }

const Key = props=>{
    return <div className="key" onClick={props.onClick}>{props.content}</div>;
  }

const Numbers = props=>{
  for(var i = 1;i<=12;i++){
    var content;
    if(i==10) content = "0";
    else if(i==11) content = ".";
    else if(i==12) content = "00";
    else content = i;
    
    (props=>{
      return (<Key key = {i} content = {content} onClick = {props.onClick}/>)
    })();
  }
}

const Nums = props=>{
    let numbers = [];
    for(var i = 1;i<=12;i++){
    let content = "";
    if(i==10) content = "0";
    else if(i==11) content = ".";
    else if(i==12) content = "00";
    else content = i;
      
    numbers.push(
      <Key content = {content} onClick = {props.Input}/>
    );
    }
  
    return (
    <div className ="nums">
      {numbers}
    </div>
    );
  }

const Operators = props=>{
    return (
    <div className = "operators">
    <Key content = "+" onClick = {props.Input}/>
    <Key content = "-" onClick = {props.Input}/>
    <Key content = "*" onClick = {props.Input}/>
    <Key content = "/" onClick = {props.Input}/>
    </div>
    );
  }

const Evals = props=>{
    return (
    <div className = "evals">
      <Key content = "C" onClick = {props.clear}/>
      <Key content = "DEL" onClick = {props.del}/>
      <Key content = "=" onClick = {props.calc}/>
    </div>
    );
}

const Toggle = props=>{
    return (<span className = "toggle" onClick = {props.onClick}>{props.colorType}</span>);
  }

const Color = props=>{
    return (
      <p className = "color">
      <Toggle colorType = {props.colorType} onClick = {props.toggle}/>
      <span className = "bgc">{props.color}</span>
    <span className = "copy" style={{color:props.color, backgroundColor: props.textColor, borderColor: props.textColor}} onClick={props.copy}>COPY</span>
    </p>
    );
  }

const Keyboard = props=>{
  return (
        <div className = "keyborad">
    <Evals clear={props.clear} del={props.del} calc = {props.calc}/>  
    <div className = "box">
    <Nums Input = {props.Input}/>
    <Operators Input = {props.Input}/>
    <Color colorType = {props.colorType} color = {props.color} textColor = {props.textColor} copy = {props.copy} toggle = {props.toggle}/>
      </div>
      </div>
    );
  }

// putting together
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      prevString: "",
      calcString: "",
      color:"#2abacd",
      textColor:"#fff",
      colorType: "HEX ▸"
    };
    //binding "this"
    this.Input = this.Input.bind(this);
    this.clear = this.clear.bind(this);
    this.del = this.del.bind(this);
    this.calc = this.calc.bind(this);
    this.hexToRgb = this.hexToRgb.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.shine = this.shine.bind(this);
    this.copy = this.copy.bind(this);
    this.toggle = this.toggle.bind(this);
  }
// Methods
  Input(e){
    let string = this.state.calcString + e.target.innerHTML;
    this.setState({calcString : string});
    this.shine();
  }
  clear(){        
    this.setState({
      calcString:"",
      prevString:""});
  }
  del(){
    let string = this.state.calcString.slice(0,-1);
    this.setState({calcString:string});
  }
  calc(){
	let result = eval(this.state.calcString),         
      prev = this.state.calcString;
	this.setState({calcString: result, prevString: prev});
  }
  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
  rgbToHex(color) {
if (color.charAt(0) === "#") {
return color; }

let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
    r = parseInt(nums[2], 10).toString(16), 
    g = parseInt(nums[3], 10).toString(16), 
    b = parseInt(nums[4], 10).toString(16);

return "#"+ ( (r.length == 1 ? "0"+ r : r) + (g.length == 1 ? "0"+ g : g) + (b.length == 1 ? "0"+ b : b) ); 

}
  shine(){
    let body = document.querySelector('body'),
        color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
        rgb = this.hexToRgb(color),      rgbColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`,
        colorType=this.state.colorType;

   let o = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000);

(o > 180) ? this.state.textColor="#594741": this.state.textColor="#fff";

    colorType == "HEX ▸" ?
    this.setState({color: color}):this.setState({color: rgbColor})
  }
  copy(){
  let copyArea = document.querySelector('.bgc'),
      range = document.createRange(); 
      range.selectNode(copyArea); 
      window.getSelection().addRange(range);
      document.execCommand("Copy"); 
  }
  toggle(){
    let color = this.state.color,
        colorType = this.state.colorType;
    
    if(colorType == "HEX ▸"){
      let rgb = this.hexToRgb(color), 
          rgbColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
      
      this.setState({colorType:"◂  RGB",color:rgbColor});
    }else{
      let hexColor = this.rgbToHex(color);
      this.setState({colorType:"HEX ▸",color:hexColor});
    }
  }

// Render app
  render(){
  document.querySelector('body').style.backgroundColor=this.state.color;  document.querySelector('body').style.color=this.state.textColor;
    
    return (
    <div className="app">
    
    <Input prevString={this.state.prevString} calcString={this.state.calcString}/>
    
    <Keyboard Input = {this.Input} colorType = {this.state.colorType} color = {this.state.color} textColor = {this.state.textColor} copy = {this.copy} toggle = {this.toggle} calc={this.calc} del={this.del} clear = {this.clear}/>
        
    </div>
    );
  }
}

render(<App/>,document.querySelector('body'));