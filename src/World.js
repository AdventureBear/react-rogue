import React, { Component } from 'react'

import './World.css'

class World extends Component {

    constructor(props){
        super(props)

        let startrows =40
        let startcols = 60
        let rooms = []
        let arr = Array(startrows).fill().map(()=>Array(startcols).fill(0));
        //this.generateRooms(arr, startrows, startcols, rooms)
        rooms = this.fillTestRooms()
        this.drawRooms(arr, rooms)
        this.drawCorridors(arr,rooms)

        this.state=({
            world: arr,
            height: startrows,
            width: startcols
        })

    }

    fillTestRooms = () => {
        return ([
            {left: 2, top: 22, right: 10, bottom: 31, vcenter:27 , hcenter: 6},
            {left: 15, top: 26, right: 21, bottom: 37, vcenter:31, hcenter:18},
            {left: 25, top: 28, right: 35, bottom: 36, vcenter:32, hcenter:30},
            {left: 36, top: 14, right: 44, bottom: 20, vcenter:17, hcenter:40},
            {left: 44, top: 22, right: 54, bottom: 29, vcenter:25, hcenter:49},
            {left: 45, top: 7, right: 54, bottom: 17, vcenter:12, hcenter:50}
        ])

    }

    generateRooms = (arr, startrows, startcols, rooms) => {
        let roomWidth, roomHeight, x, y
        let numRooms = (Math.floor(Math.random() * 4) + 4)
        let newRoom = {}

        for (let i=0; i< numRooms; i++) {
            console.log("Building room: " + i + " of " + numRooms)
            roomWidth = Math.floor(Math.random() * 6) +6                //width
            roomHeight = Math.floor(Math.random() * 6) +6               //height
            x = Math.floor(Math.random() * (startcols - roomWidth))     // col origin
            y = Math.floor(Math.random() * (startrows - roomHeight))    // row origin

            newRoom = {"left":x, "top": y, "right": x+roomWidth, "bottom": y+roomHeight}
            this.checkIntersections(newRoom, rooms)

            //if (rooms.length>0) {
            //    //console.log("Rooms array > 1")
            //    if (this.checkIntersections(newRoom, rooms)) {
            //        rooms.push(newRoom)
            //    }
            //} else {
            //    rooms.push(newRoom)
            //}


            rooms.push(newRoom)
        }
        //console.log("Rooms: " , rooms)
    }

    checkIntersections  = (r1, r2s)=> {
            r2s.forEach((r2)=> {

                console.log("comparing rooms:")
                console.log("Room1: ", r1)
                console.log("Room2: ", r2)

                if (r1.left >(r2.right)) {
                    console.log("Left edge clear")
                    return true
                }

                if ((r1.right)<r2.left) {
                    console.log("Right Edge Clear")
                    return true
                }

                if ((r1.top)> (r2.bottom)){
                    console.log("top edge clear")
                    return true
                }

                if ((r1.bottom) < r1.top){
                    console.log("bottom edge clear")
                    return true
                }


            })
    }

    drawRooms = (arr, rooms) =>{
        rooms.forEach((room)=>{
            console.log("creating Room")

            for (let i=room.top; i<room.bottom; i++) {
                for (let j=room.left; j<room.right; j++) {
                    arr[i][j] = 1
                }
            }

        })
    }

    drawCorridors = (arr, rooms) => {
        for (let i = 0; i< rooms.length-1; i++){
            console.log(rooms[i]["vcenter"])
            let x = rooms[i]['hcenter']
            let y = rooms[i]['vcenter']
            let nextX = rooms[i+1]['hcenter']
            let nextY = rooms[i+1]['vcenter']
            let x1  = Math.min(rooms[i]['hcenter'], rooms[i+1]['hcenter'])
            let x2  = Math.max(rooms[i]['hcenter'], rooms[i+1]['hcenter'])
            let y1  = Math.min(rooms[i]['vcenter'], rooms[i+1]['vcenter'])
            let y2  = Math.max(rooms[i]['vcenter'], rooms[i+1]['vcenter'])
            console.log(x1,x2, y1, y2)
            if ((Math.random() < 0.5)){
                    this.createVCorridor(arr,x, y1, y2)
                    this.createHCorridor(arr,nextY, x1, x2)
               } else {
                    this.createHCorridor(arr,y,x1,x2)
                    this.createVCorridor(arr,nextX,y1,y2)
               }
            }
    }

    createVCorridor=((arr, x,y1,y2)=>{
        for (let j=y1; j<y2; j++) {
            arr[j][x]= 1
        }
    })

    createHCorridor=((arr,y, x1, x2)=>{
        for (let k=x1; k<x2; k++) {
            arr[y][k]= 1
        }
    })

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
            }
            fullBoard.push(<tr key={i}>{Object_row}</tr>)
        }

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
