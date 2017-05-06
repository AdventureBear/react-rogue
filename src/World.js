import React, { Component } from 'react'
import './World.css'

class World extends Component {
    constructor(props){
        super(props)

        let startrows =40
        let startcols = 60
        let rooms = []
        let items = []
        let arr = Array(startrows).fill().map(()=>Array(startcols).fill(0))
        this.generateRooms(arr, startrows, startcols, rooms, items)

        this.drawRooms(arr, rooms)
        this.drawItems(arr, items)
        this.drawCorridors(arr,rooms)

        //this.generateObjects(arr, rooms, entities)

        this.state=({
            world: arr,
            height: startrows,
            width: startcols
        })

    }

    //*****Legend*******
    //*0 Wall
    //*1 Empty (room or corridor)
    //*2 Player
    //*3 Enemy (Trick)
    //*4 Treats (Health)
    //*5 Exit
    //***********************

    generateRooms = (arr, startrows, startcols, rooms, items) => {
        let roomWidth, roomHeight, x, y, itemX, itemY
        let numRooms = (Math.floor(Math.random() * 4) + 4)
        let newRoom = {}
        let newItem = {}

        //for (let i=0; i< numRooms; i++) {
        let i=0
        while (i<numRooms) {
            console.log("Building room: " + i + " of " + numRooms)
            roomWidth = Math.floor(Math.random() * 6) + 6                //width
            roomHeight = Math.floor(Math.random() * 6) + 6               //height
            x = Math.floor(Math.random() * (startcols - roomWidth))     // col origin
            y = Math.floor(Math.random() * (startrows - roomHeight))    // row origin

            itemX = x + Math.floor(Math.random()*roomWidth)
            itemY = y + Math.floor(Math.random()*roomHeight)

            newRoom = {
                "left": x,
                "top": y,
                "right": x + roomWidth,
                "bottom": y + roomHeight,
                "hcenter": x + (Math.floor(roomWidth / 2)),
                "vcenter": y + (Math.floor(roomHeight / 2))
            }

            let failed = false
            rooms.forEach((room)=> {
                if (this.checkIntersections(newRoom, room)) {
                    failed = true
                }
            })

            if (!failed) {
                rooms.push(newRoom)
                items.push(newItem)
                i += 1
            }
        }
    }

    checkIntersections  = (r1, r2)=> {
                return (r1.left <= r2.right && r1.right >= r2.left &&
                r1.top <= r2.bottom && r2.bottom >= r2.top)
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

    drawItems = (arr, items) =>{
        items.forEach((item)=>{
            console.log("creating item")
            console.log(item)
            let x = item[0]
            let y = item[1]
            arr[x][y] = 1
            console.log(arr[x][y])
        })
    }

    drawCorridors = (arr, rooms) => {
        for (let i = 0; i< rooms.length-1; i++){
            let x = rooms[i]['hcenter']
            let y = rooms[i]['vcenter']
            let nextX = rooms[i+1]['hcenter']
            let nextY = rooms[i+1]['vcenter']
            let x1  = Math.min(rooms[i]['hcenter'], rooms[i+1]['hcenter'])
            let x2  = Math.max(rooms[i]['hcenter'], rooms[i+1]['hcenter'])
            let y1  = Math.min(rooms[i]['vcenter'], rooms[i+1]['vcenter'])
            let y2  = Math.max(rooms[i]['vcenter'], rooms[i+1]['vcenter'])
            //console.log(x1, x2, y1, y2)
            if ((Math.random() < 0.5)){
                    this.createVCorridor(arr, x, y1, y2)
                    this.createHCorridor(arr, nextY, x1, x2)
               } else {
                    this.createHCorridor(arr, y, x1, x2)
                    this.createVCorridor(arr, nextX, y1, y2)
               }
            }
    }

    createVCorridor=((arr, x, y1, y2)=>{
        for (let j = y1; j <= y2; j++) {
            arr[j][x]= 1
        }
    })

    createHCorridor=((arr, y, x1, x2)=>{
        for (let k = x1 ; k <= x2; k++) {
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
                    } else if (this.state.world[i][j]===1){
                    Object_row.push(
                      <td  key={j + i*10}
                           className='component-tile floor'>
                          <span></span>
                      </td>
                    )
                } else if (this.state.world[i][j]===2) {
                    Object_row.push(
                      <td  key={j + i*10}
                           className='component-tile char'>
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
