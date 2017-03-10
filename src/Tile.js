import React, { Component } from 'react'
import './Tile.css'

class Tile extends Component {
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div className='component-tile'>
             <table>
                <tbody>

                </tbody>
             </table>
            </div>
        )
    }
}

Tile.propTypes = {
    numRows: React.PropTypes.number,
    numCols: React.PropTypes.number
};

export default Tile