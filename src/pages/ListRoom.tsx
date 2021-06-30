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
    var roomUniqueArray: any[] = []
    var titles: any[] = []
    var codes: any[] = []
     
    database.ref('rooms').on('value', (snapshot) => {
      codes.push(Object.keys(snapshot.val()))

        snapshot.forEach(item => {
          titles.push(item.val().title)
        })

      })

      for (let index = 0; index < titles.length; index++) {
        roomUniqueArray.push(codes[0][index], titles[index] )      
      }
  
      setRooms(roomUniqueArray)
      
    }, [] )

  function handleHome(){
    history.push('/')
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
              return index % 2 === 0 ? 

                <button>{room}</button>

                :

                <button>{room}</button>
            })
          }
        </div>
      </main>
    </div>
  )
}