import { useEffect } from "react"
import { useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
  likes: Record<string, {
    authorId: string
  }>
}>

type QuestionType ={
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
  likeCount: number,
  likeId: string | undefined
}

export function useRoom(roomId: string){
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  //mostrar as perguntas feitas quando a página carregar
  //de acordo com a navegação e o roomId mudar
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    //ouvir o evento uma única vez (once)
    //ouvir sempre que mudar (on)
    roomRef.on('value', room => {
      const databaseRoom = room.val()      
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return{
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })

      //O título da sala e as perguntas ficam disponíveis na página
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }

  }, [roomId, user?.id])

  return { questions, title}
}