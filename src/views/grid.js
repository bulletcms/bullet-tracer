import React from 'react';


class Grid extends React.Component{
  /**
   * props:
   *   strict: boolean - no margins between columns
   *   array: boolean - should double grid at 4k
   *   center: boolean - flexbox vertical center
   *   stretch: boolean - flexbox vertical stretch
   */
  render(){
    const center = (this.props.vcenter) ? " flex-v-center" : "";
    const stretch = (this.props.vstretch) ? " flex-v-stretch" : "";
    const strict = (this.props.strict) ? "-strict" : "";
    const array = (this.props.array) ? " array" : "";
    const style = "grid" + strict + array + center + stretch;
    return <div className={style}>
      {this.props.children}
    </div>;
  }
}

class Column extends React.Component{
  /**
   * props:
   *   size: integer - numerator
   *   unit: integer - denominator
   */
  render(){
    const unit = this.props.unit || 12;
    const style = `col col${unit}-${this.props.size}`;
    return <div className={style}>
      {this.props.children}
    </div>;
  }
}

class Row extends React.Component{
  /**
   * props:
   *   center: boolean - flexbox vertical center
   *   stretch: boolean - flexbox vertical stretch
   */
  render(){
    const center = (this.props.vcenter) ? " flex-v-center" : "";
    const stretch = (this.props.vstretch) ? " flex-v-stretch" : "";
    const style = "row" + center + stretch;
    return <div className={style}>
      {this.props.children}
    </div>
  }
}

export {Grid, Column, Row};
