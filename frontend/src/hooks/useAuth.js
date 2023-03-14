import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux' //Como está em redux, precisa para pegar os dados da store

export const useAuth = () => {
    const { user } = useSelector((state) => state.auth)

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if(user){
            setAuth(true)
        }else{
            setAuth(false)
        }

        setLoading(false)
    }, [user])

    return { auth, loading }
}