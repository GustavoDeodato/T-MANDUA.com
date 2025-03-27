'use strict'

document.querySelector('.criar').addEventListener('click', CadastrarUsuario)

async function CadastrarUsuario() {
    const username = document.querySelector('input[placeholder="Nome de usuario"]').value
    const email = document.querySelector('input[placeholder="E-mail"]').value
    const password = document.querySelector('input[placeholder="Senha"]').value
    const confirmPassword = document.querySelector('input[placeholder="Confimar senha"]').value
    const recuperatePassword = document.querySelector('input[placeholder="Senha de Recuperação"]').value

    if (!username || !email || !password || !confirmPassword || !recuperatePassword) {
        alert("Por favor, preencha todos os campos.")
        return
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.")
        return;
    }

    const userData = {
        nome: username,
        email: email,
        senha: password,
        premium: 0,
        imagemPerfil: "https://i.pinimg.com/736x/6c/ce/9d/6cce9da91a134fe352c2f8db091a4116.jpg",
        senhaRecuperacao: recuperatePassword
    }

    try {
        const button = document.querySelector('.criar')
        button.innerText = "Cadastrando..."

        const response = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário')
        }

        const result = await response.json()
        alert("Usuário cadastrado com sucesso!")
        window.location.href = '../login/index.html'
    } catch (error) {
        alert(error.message)
        console.error('Erro durante registro:', error)
    } finally {
        const button = document.querySelector('.criar')
        button.innerText = "Criar Conta"
    }
}