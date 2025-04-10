'use strict'

const login = async () => {
    const email = document.getElementById('Email').value
    const senha = document.getElementById('password').value

    const url = `https://back-spider.vercel.app/login`
    const data = {
        email: email,
        senha: senha
    }

   

    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options)

        if (response.ok) {
            const result = await response.json()
            if (result.success) {
                const resultUser = result.user
                localStorage.setItem('userId', resultUser.id) // ou "id", depende da sua API
                localStorage.setItem('userData', JSON.stringify(resultUser)) // salva tudo, se quiser
                alert("Login realizado com sucesso!")
                window.location.href = '../home/home.html'
            }            
            else {
                alert("Erro ao logar. Verifique se os dados estão corretos")
            }
            console.log(result)
        } else {
            console.error('Login falhou:', response.statusText)
            alert("Erro ao logar. Verifique se os dados estão corretos")
        }
    } catch (error) {
        console.error('Error durante o login:', error)
    }
}

document.getElementById('entrarLogin').addEventListener('click', login)
