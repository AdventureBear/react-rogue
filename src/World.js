import React, { Component } from 'react'

import './World.css'

class World extends Component {

    constructor(props){
        super(props)

        let startrows =40
        let startcols = 60
        let roomWidth, roomHeight, x, y

        let arr = Array(startrows).fill().map(()=>Array(startcols).fill(0));
        //console.log(arr)
        let rooms = (Math.floor(Math.random() * 4) + 4)
       // let rooms = 2
        //make 4-8 random rooms
        for (let i=0; i< rooms; i++) {
            //random height & width between 6 & 12
             roomWidth = Math.floor(Math.random() * 6) + 6
             roomHeight = Math.floor(Math.random() * 6) + 6
            //random start min 1 & max start - size
             x = Math.floor(Math.random() * (startrows - roomHeight))
            y = Math.floor(Math.random() * (startcols - roomWidth))
            console.log("New Room Coords:" +  x, y, roomWidth, roomHeight)
            this.createRoom(arr, x, y, roomWidth, roomHeight)
        }

        this.state=({
            world: arr,
            height: startrows,
            width: startcols
        })

    }

    createRoom = (arr,colstart,rowstart,width,height) => {
        console.log("creating Room")
        for (let i=0; i<width; i++) {
            for (let j=0;j<height;j++) {
                arr[i+colstart][j+rowstart] = 1
            }
        }
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
                if (this.state.world[i][j]===0){
                    Object_row.push(
                      <td  key={j + i*10}
                           className='component-tile wall'>
                      <span></span>
                      </td>
                    )
                    } else {
                    Object_row.push(
                      <td  key={j + i*10}
                           className='component-tile floor'>
                          <span></span>
                      </td>
                    )
                }
                //console.log("Object Row:" + Object_row)

            }
            fullBoard.push(<tr key={i}>{Object_row}</tr>)
        }

        //console.log("Board: " + fullBoard)

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
