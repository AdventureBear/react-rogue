import React, { Component } from 'react'

import './World.css'

class World extends Component {

    constructor(props){
        super(props)

        let startrows =40
        let startcols = 60
        let rooms = []
        let arr = Array(startrows).fill().map(()=>Array(startcols).fill(0));
        this.generateRooms(arr, startrows, startcols, rooms)
        this.drawRooms(arr, rooms)

        this.state=({
            world: arr,
            height: startrows,
            width: startcols
        })

    }

    generateRooms = (arr, startrows, startcols, rooms) => {
        let roomWidth, roomHeight, x, y
        let numRooms = (Math.floor(Math.random() * 4) + 4)
        let newRoom = {}

        for (let i=0; i< numRooms; i++) {
            roomWidth = Math.floor(Math.random() * 6) + 6
            roomHeight = Math.floor(Math.random() * 6) + 6
            x = Math.floor(Math.random() * (startcols - roomWidth))
            y = Math.floor(Math.random() * (startrows - roomHeight))

            newRoom = {"x":x, "y": y, "width": roomWidth, "height": roomHeight}
            rooms.push(newRoom)
        }



        console.log("Rooms: " , rooms)
    }

    drawRooms = (arr, rooms) =>{
        rooms.forEach((room)=>{
            console.log("creating Room")
            for (let i=0; i<room.height; i++) {
                for (let j=0;j<room.width;j++) {
                    arr[i+room.y][j+room.x] = 1
                }
            }
        })
    }

    //drawRoom = (arr,colstart,rowstart,width,height) => {
    //    console.log("creating Room")
    //    for (let i=0; i<height; i++) {
    //        for (let j=0;j<width;j++) {
    //            arr[i+rowstart][j+colstart] = 1
    //        }
    //    }
    //}


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
