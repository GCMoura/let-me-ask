import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'

import '../styles/list-room.scss'


export function ListRoom(){

  const history = useHistory()

  var room: any[] = []
  
  const [rooms, setRooms] = useState([room])
  
  useEffect(() => {
    var titles: any[] = []
     
    database.ref('rooms').on('value', (snapshot: any) => {
      
      Object.entries(snapshot.val()).forEach(([key, value]: any) => {
        titles.push(value.title)
      }) 
    })
    
    setRooms(titles)
      
    }, [] )

  function handleHome(){
    history.push('/')
  }

  function handleRoom(index: number){
    var codes: any[] = []
     
    database.ref('rooms').on('value', (snapshot: any) => {
      
      Object.entries(snapshot.val()).forEach(([key, value]: any) => {
        codes.push(key)
      }) 
    })

    history.push(`/rooms/${codes[index]}`)
  }

  return (
    <div id='page-room'>
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" onClick={handleHome}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Lista de salas</h1>
        </div>
        <div className='room-content'>
          {
            rooms.map((room, index) => {
              return (
                <button key={index} onClick={ () => handleRoom(index)}>{room}</button>
              )
              })
          }
        </div>
      </main>
    </div>
  )
}