import React from 'react';

class Input extends React.Component{
  /**
   * props:
   *   label: string
   *   type : string - input type
   *   handleChange: function callback - passed input value
   */
  render(){
    return <div className="input">
      <input placeholder=" " type={this.props.type || "text"} onChange={(event)=>{
        if(this.props.handleChange){
          this.props.handleChange(event.target.value);
        }}}/>
      <label>{this.props.label}</label>
    </div>;
  }
}


export {Input};
