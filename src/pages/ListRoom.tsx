
import { useEffect } from 'react'
import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'
import { useState } from 'react'

type RoomType = {
  title: string
}

export function ListRoom(){

  const [rooms, setRooms] = useState([])

  useEffect(() => {
     database.ref('rooms').get().then((snapshot) => {
       console.log(snapshot.val())
       Object.entries(snapshot.val()).map(([ key, value ]) => {
        console.log(key, value)
        console.log(value.title)
        return 
       })
       //setRooms(snapshot.val())
     })
     
    }, [ ] )


  return (
    <div id='page-room'>
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Lista de salas</h1>
        </div>
        <div>
          {/* {rooms} */}
        </div>
      </main>
    </div>
  )
}