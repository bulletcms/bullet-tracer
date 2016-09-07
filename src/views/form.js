import React from 'react';

class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: props.value || ''};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value || ''});
  }

  /**
   * props:
   *   label       : string
   *   type        : string - input type
   *   value       : string - initial value
   *   error       : string
   *   handleChange: function callback - passed input value
   *   handleBlur  : function callback - passed input value
   */
  render(){
    const className = ['input'];
    if(this.props.error){
      className.push('invalid');
    }
    return <div className={className.join(' ')}>
      <input placeholder=" " type={this.props.type || "text"} value={this.state.value} onChange={(event)=>{
        this.setState({value: event.target.value});
        if(this.props.handleChange){
          this.props.handleChange(event.target.value);
        }}}
        onBlur={()=>{
          if(this.props.handleBlur){
            this.props.handleBlur(this.state.value);
          }
        }}/>
      <label>{this.props.label}</label>
      {this.props.error && <span className="error">{this.props.error}</span>}
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
   *   valid       : boolean
   *   handleChange: function callback - passed input value
   *   handleBlur  : function callback - passed input value
   */
  render(){
    return <div>
      {this.props.label && <span><label>{this.props.label}</label><br/></span>}
      <textarea placeholder={this.props.placeholder || ''}
        value={this.state.value}
        cols={this.props.cols || 80}
        rows={this.props.rows || 4}
        onChange={(event)=>{
          this.setState({value: event.target.value});
          if(this.props.handleChange){
            this.props.handleChange(event.target.value);
          }
        }}
        onBlur={()=>{
          if(this.props.handleBlur){
            this.props.handleBlur(this.state.value);
          }
        }}></textarea>
      {this.props.invalid && this.props.error && <span className="error">{this.props.error}</span>}
    </div>;
  }
}


export {Input, Textarea};
