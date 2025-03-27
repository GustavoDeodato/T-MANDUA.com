'use scrict'

async function RecuperaçãoSenha (){
    const email = document.getElementById('email').value 
    const wordkey = document.getElementById('SenhaRecuperação').value
    const url = `https://back-spider.vercel.app/user/RememberPassword`

    const data = {
        
        email: email,
        senhaRecuperacao: wordkey

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
              alert("Senha recuperada com sucesso!")
              window.location.href = '../login/index.html'
            console.log(result)
        } else {
            console.error('Login falhou:', response.statusText)
            alert("Erro ao logar. Verifique se os dados estão corretos")
        }
    } catch (error) {
        console.error('Error durante o login:', error)
    }
}