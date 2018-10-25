import React, {Component} from 'react'; 
export default class Props extends Component { 
    render(){ console.log(this.props)
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
                    </div>
                </div>
            </div>
        ) 
    } 
}