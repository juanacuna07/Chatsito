import { useEffect,useState } from "react"
import { io } from "socket.io-client"

function App() {
  const [inputMessage, setInputMessage] = useState("")
  const [mensajeRecibido, setMensajeRecibido] = useState([])
  const [socket, setSocket] = useState()
  const [user, setUser] = useState("")

  useEffect(() => {
    const newSocket = io("172.20.10.2:3000")
    setSocket(newSocket)

    newSocket.on("mensaje", (msg) => {
      setMensajeRecibido(msg)
    })

    setUser(prompt("Ingrese su nombre:")) 

    return () => { newSocket.disconnect() }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Cómo se envían los mensajes...
    socket.emit("mensaje", {user, inputMessage}) 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInputMessage(e.target.value)}/>
        <button type="submit">Enviar</button>
      </form>

      { mensajeRecibido.map( mensaje => <div>{mensaje.user}: {mensaje.inputMessage} </div> ) } 
    </div>
  )
}

export default App