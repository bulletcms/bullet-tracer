import React from 'react';

class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: props.value || ''};
  }

  /**
   * props:
   *   label       : string
   *   type        : string - input type
   *   value       : string - initial value
   *   handleChange: function callback - passed input value
   */
  render(){
    return <div className="input">
      <input placeholder=" " type={this.props.type || "text"} value={this.state.value} onChange={(event)=>{
        this.setState({value: event.target.value});
        if(this.props.handleChange){
          this.props.handleChange(event.target.value);
        }}}/>
      <label>{this.props.label}</label>
    </div>;
  }
}

class Textarea extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: props.value || ''};
  }

  /**
   * props:
   *   label       : string
   *   placeholder : string
   *   value       : string - initial value
   *   cols        : columns for textbox
   *   rows        : rows for textbox
   *   handleChange: function callback - passed input value
   */
  render(){
    return <div>
      {this.props.label && <span><label>{this.props.label}</label><br/></span>}
      <textarea placeholder={this.props.placeholder || ""}
        value={this.state.value}
        cols={this.props.cols || 80}
        rows={this.props.rows || 4}
        onChange={(event)=>{
          this.setState({value: event.target.value});
          if(this.props.handleChange){
            this.props.handleChange(event.target.value);
          }
        }}></textarea>
    </div>;
  }
}


export {Input, Textarea};
