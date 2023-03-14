import { api, requestConfig } from '../utils/config'

// Register an user
const register = async(data) => {
    const config = requestConfig("POST", data)

    try {
        // Esperar uma resposta de um await fetch chamando a url de api + url que quero acessar para a função e depois mando o config
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json()) // Then onde recebo dados e transforma em json
            .catch((err) => err) // Se der algo de errado cai no catch e retorna o error

            if(res){                        // JSON.stringify(res) === transforma em string novamente a resposta
                localStorage.setItem("user", JSON.stringify(res)) // Salvando na localStorage para ver depois se o uso está logado ou não
            }
            return res
    } catch (error) {
        console.log(error)
    }
}

// Logout an user
const logout = () => {
    localStorage.removeItem("user")
}

// Sing in an user
const login = async (data) => {
    const config = requestConfig("POST", data)

    try {
        // Esperando resposta da requisição fecth para a url api + "users/login"
        const res = await fetch(api + "/users/login", config)
            .then((res) => res.json()) // Transforma o texto que chega na req em objeto 
            .catch((err) => err) // Retorna possiveis erros

        if(res){
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login,
}

export default authService 