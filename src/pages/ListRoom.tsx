
import { useEffect } from 'react'
import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'
import { useState } from 'react'

type RoomType = {
  code: string,
  title: string
}

export function ListRoom(){

  const [rooms, setRooms] = useState<RoomType[]>([])
  
  useEffect(() => {
     database.ref('rooms').get().then((snapshot) => {
        console.log(snapshot.val())
        let object = snapshot.val() 
        let arr = Object.entries(object)
        createSet(arr)
      })
    }, [ ] )

  function createSet(arr: any){
    arr.map((each: any) => {
      each.map((key: any, value: any) => {
        return setRooms(key)
      })
    })
  }

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
          {typeof(rooms)}
        </div>
      </main>
    </div>
  )
}