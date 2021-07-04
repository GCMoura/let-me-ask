import { useHistory } from 'react-router'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/auth.scss'

export default function Home(){

  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle()
    }
      
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    //verifica se o input e3ta vazio
    if(roomCode.trim() === ''){
      return
    }
    //traz o código da sala do firebase
    const roomRef = await database.ref(`rooms/${roomCode}`).get()
    //Se a sala não existe retorna erro
    if(!roomRef.exists()) {
      alert("Room does not exists.")
      return
    }

    if(roomRef.val().endedAt){
      alert('Room Already Closed')
      return
    }

    //se a sala existe encaminha para a página da sala
    history.push(`/rooms/${roomCode}`)
  }

  function handleListRoom(){
    history.push("/rooms/list")
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt='Illustration'/>
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo" />
          <button onClick={handleCreateRoom} className="create-room" >
            <img src={googleIconImg} alt="Google Icon" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            Ou entre em uma sala
          </div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value = {roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <Button className="list-room-button" onClick={handleListRoom}>
            Listar Salas
          </Button>
        </div>
      </main>
    </div>
  )
}