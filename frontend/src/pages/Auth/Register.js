import './Auth.css'

// Icons 
import { FaReact } from 'react-icons/fa'

// Components 
import { Navigate } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux 
import { register, reset } from "../../slices/authSlice"
import { Link } from 'react-router-dom'


const Resgister = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch() // Permite utilizar as funções do redux (register, reset)

  // Extraindo o estado que esta no slice (login, success, error)
  const {loading, error} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)

    dispatch(register(user))
  } 

  // Clean all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id='register'>
      <h2><FaReact /> ReactGram</h2>
      <p className="subtitle">Cadastre-se e compartilhe momentos</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Nome' 
          onChange={(e) => setName(e.target.value)} 
          value={name}
        />
        <input 
          type="email" 
          placeholder='E-mail' 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
        <input 
          type="password" 
          placeholder='Senha (min 5 caracteres)' 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
        <input 
          type="password" 
          placeholder='Confirme a senha' 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error"/>}
      </form>
      <p>
        Já tem uma conta? <Link to='/login'>Entrar</Link>
      </p>
    </div>
  )
}

export default Resgister
