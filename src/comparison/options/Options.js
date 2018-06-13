import React, {Component} from 'react';
import './Options.css';

export default class Options extends Component{
    constructor(props){
        super(props);

        this.state = {
            buttons: [ 
                {
                    action: "groupBySource",
                    label: "Group By Source"
                },
                {
                    action: "groupDefault",
                    label: "Group By Story"
                } 
            ]
        } 
    }

    render(){
        return (
            <div className="pt-2 col-12 options">
                { this.state.buttons.map( button => <button className='btn btn-outline-primary mr-2' onClick={ this.props[button.action] }>{button.label}</button> ) }
            </div>
        )
    }
}