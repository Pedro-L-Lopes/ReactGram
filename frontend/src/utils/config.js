export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"

// Metodo da requisição // Dados que serão enviados // Token começa como null prevendo que o usuario não está logado
export const requestConfig = (method, data, token = null, image = null) => {

    let config 

    if(image){ // Requisição de imagem // Formato formData 
        config = {
            method,
            body: data, 
            headers: {} // Precisa do headers mas pode deixar vazio
        }
    } else if(method === "DELETE" || data === null){ // Quando não precisa de dados ex: like
        config = {
            method,
            headers: {} // Precisa do headers mas pode deixar vazio
        }
    } else { // Quando vem dados // Json
        config = {
            method,
            body: JSON.stringify(data),
            headers: { // headers obrigatorio
                "Content-Type" : "application/json"
            }
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}