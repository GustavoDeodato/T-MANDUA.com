'use strict'

async function RecuperaçãoSenha() {
    const email = document.getElementById('Email').value
    const wordkey = document.getElementById('SenhaRecuperacao').value
    const url = `https://back-spider.vercel.app/user/RememberPassword`
    const urlPut = `https://back-spider.vercel.app/user/newPassword/2`

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
        if (!response.ok) {
            console.error('Falha ao validar a chave de recuperação:', response.statusText)
            alert("Erro ao validar chave de recuperação. Verifique se os dados estão corretos.")
            return
        }

        const result = await response.json()
        console.log(result)
        alert("Chave de recuperação validada com sucesso!")
        
        modal()
        
    } catch (error) {
        console.error('Erro durante o processo:', error)
        alert("Ocorreu um erro inesperado. Tente novamente.")
    }
}

function modal() {
    const modalContainer = document.createElement("div")
    modalContainer.style.position = "fixed"
    modalContainer.style.top = "0"
    modalContainer.style.left = "0"
    modalContainer.style.width = "100vw"
    modalContainer.style.height = "100vh"
    modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
    modalContainer.style.display = "flex"
    modalContainer.style.alignItems = "center"
    modalContainer.style.justifyContent = "center"

    const modalContent = document.createElement("div")
    modalContent.style.background = "#fff"
    modalContent.style.padding = "20px"
    modalContent.style.borderRadius = "8px"
    modalContent.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)"
    modalContent.style.textAlign = "center"
    modalContent.style.width = "300px"

    const titulo = document.createElement("h2")
    titulo.textContent = "Redefinir Senha"

    const inputSenha = document.createElement("input")
    inputSenha.type = "password"
    inputSenha.id = "NovaSenha"
    inputSenha.placeholder = "Nova Senha"
    inputSenha.style.display = "block"
    inputSenha.style.margin = "10px auto"
    inputSenha.style.padding = "8px"
    inputSenha.style.width = "90%"

    const inputConfirmarSenha = document.createElement("input")
    inputConfirmarSenha.type = "password"
    inputConfirmarSenha.id = "ConfirmarSenha"
    inputConfirmarSenha.placeholder = "Confirmar Senha"
    inputConfirmarSenha.style.display = "block"
    inputConfirmarSenha.style.margin = "10px auto"
    inputConfirmarSenha.style.padding = "8px"
    inputConfirmarSenha.style.width = "90%"

    const botaoConfirmar = document.createElement("button")
    botaoConfirmar.textContent = "Confirmar"
    botaoConfirmar.style.marginRight = "10px"
    botaoConfirmar.style.padding = "10px 20px"
    botaoConfirmar.style.background = "green"
    botaoConfirmar.style.color = "white"
    botaoConfirmar.style.border = "none"
    botaoConfirmar.style.borderRadius = "5px"
    botaoConfirmar.style.cursor = "pointer"
    botaoConfirmar.addEventListener("click", () => atualizarSenha(modalContainer))

    const botaoCancelar = document.createElement("button")
    botaoCancelar.textContent = "Cancelar"
    botaoCancelar.style.padding = "10px 20px"
    botaoCancelar.style.background = "red"
    botaoCancelar.style.color = "white"
    botaoCancelar.style.border = "none"
    botaoCancelar.style.borderRadius = "5px"
    botaoCancelar.style.cursor = "pointer"
    botaoCancelar.addEventListener("click", () => modalContainer.remove())

    modalContent.appendChild(titulo)
    modalContent.appendChild(inputSenha)
    modalContent.appendChild(inputConfirmarSenha)
    modalContent.appendChild(botaoConfirmar)
    modalContent.appendChild(botaoCancelar)
    modalContainer.appendChild(modalContent)
    document.body.appendChild(modalContainer)
}

async function atualizarSenha(modalContainer) {
    const novaSenha = document.getElementById("NovaSenha").value
    const confirmarSenha = document.getElementById("ConfirmarSenha").value

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, tente novamente.")
        return
    }

    const dataNew = {
        NovaSenha: novaSenha
    }

    const optionsNew = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataNew)
    }

    const responseNew = await fetch(urlPut, optionsNew)
    if (responseNew.ok) {
        alert("Senha alterada com sucesso!")
        window.location.href = '../login/index.html'
        modalContainer.remove()
    } else {
        console.error('Falha ao atualizar a senha:', responseNew.statusText)
        alert("Erro ao alterar senha. Tente novamente.")
    }
}

document.getElementById('botao-recuperacao').addEventListener("click", RecuperaçãoSenha)
