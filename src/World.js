import React, { Component } from 'react'
import Tile from './Tile'
import './World.css'

class World extends Component {
    constructor(props){
        super(props)

        let startrows =40
        let startcols = 60

        let arr = Array(startrows).fill().map(()=>Array(startcols).fill(0));
        console.log(arr)
        this.state=({
            world: arr,
            height: startrows,
            width: startcols
        })
    }

    generateBlankWorld = () => {
        const rows = this.state.height
        const cols = this.state.width
        let arr = []
        let arrRows = []

        for (let i = 0; i<rows; i++){
            for (let j=0; j<cols; j++) {
                arrRows[i][j].push(0)
            }
        }

        this.setState({
            world: arr
        })
        console.log(arr)
    }

    render(){
        let fullBoard = []
        let Object_row = []
        for (var i = 0; i < this.state.height; i++) {
            Object_row = []
            for (var j= 0; j<this.state.width; j++) {
                Object_row.push(
                  <td  key={j + i*10}
                       className='component-tile'>
                      <span></span>
                  </td>
                )
                console.log("Object Row:" + Object_row)

            }
            fullBoard.push(<tr key={i}>{Object_row}</tr>)
        }

        console.log("Board: " + fullBoard)
        return (
            <div className='component-world'>
                <table>
                    <tbody>
                    {fullBoard}
                    </tbody>
                </table>
            </div>
        )

    }
}

World.propTypes = {

};

export default World
