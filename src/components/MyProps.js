import React, {Component} from 'react'; 
import PropTypes from 'prop-types';
/**
 1. props不用像angualr一样提前定义传入属性
 2. props类型检查， propTypes
 3. 引用子节点
*/
export default class MyProps extends Component { 
    
    render(){ 
        console.log(this.props)
        return(
            <div className="container">
                <h2>props</h2>
                <div className="row">
                    <div className="col-xs-1 clo-xs-offset-11">
                        <div>name: {this.props.name}</div>
                        <p>age: {this.props.age}</p>
                        <h2>hobbies</h2>
                        <ul>
                            {
                                this.props.user.hobbies.map((hobby, i) => {
                                    return (<li key={i}>{hobby}</li>)
                                })
                             }
                        </ul>
                        <div>
                           {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        ) 
    } 
}
MyProps.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    user: PropTypes.object,
    children: PropTypes.element.isRequired
}

