'use strict'

const baseURL = 'https://back-spider.vercel.app/publicacoes'

function getUserId() {
    return localStorage.getItem('userId')
}

async function carregarPublicacoes() {
    const response = await fetch(`${baseURL}/listarPublicacoes`)
    const publicacoes = await response.json()
    const feed = document.querySelector('.feed')
    feed.innerHTML = ''

    publicacoes.forEach(publicacao => {
        const tweet = criarTweet(publicacao)
        feed.appendChild(tweet)
    })
}

function criarTweet(publicacao) {
    const tweet = document.createElement('div')
    tweet.classList.add('tweet')

    const tweetHeader = document.createElement('div')
    tweetHeader.classList.add('tweet-header')

    const userAvatar = document.createElement('img')
    userAvatar.src = publicacao.imagem || "../img/user.jpg"
    userAvatar.alt = "User Avatar"
    userAvatar.classList.add('user-avatar')

    const userName = document.createElement('span')
    userName.classList.add('user-name')
    userName.textContent = `Usuário ${publicacao.idUsuario}`

    tweetHeader.appendChild(userAvatar)
    tweetHeader.appendChild(userName)

    const tweetContent = document.createElement('p')
    tweetContent.classList.add('tweet-content')
    tweetContent.textContent = publicacao.descricao

    if (publicacao.imagem && publicacao.imagem.trim() !== "") {
        const tweetImage = document.createElement('img')
        tweetImage.src = publicacao.imagem;
        tweetImage.alt = "Imagem da publicação"
        tweetImage.classList.add('tweet-image')
        tweet.appendChild(tweetImage)
    }

    const tweetFooter = document.createElement('div')
    tweetFooter.classList.add('tweet-footer')

    const likeCount = document.createElement('span')
    likeCount.textContent = `Likes: ${publicacao.likes || 0}`
    likeCount.classList.add('like-count')

    const likeButton = document.createElement('button')
    likeButton.textContent = 'Curtir'
    likeButton.classList.add('like-button')
    likeButton.onclick = async () => {
        const userId = getUserId()
        if (userId) {
            await curtirPublicacao(publicacao.id, likeCount, userId)
        } else {
            alert('Você precisa estar logado para curtir!')
        }
    }

    const commentButton = document.createElement('button')
    commentButton.textContent = 'Comentar'
    commentButton.classList.add('comment-button')
    commentButton.onclick = () => abrirDropdownComentario(publicacao.id)

    tweetFooter.appendChild(likeButton)
    tweetFooter.appendChild(likeCount)
    tweetFooter.appendChild(commentButton)

    tweet.appendChild(tweetHeader)
    tweet.appendChild(tweetContent)
    tweet.appendChild(tweetFooter)

    return tweet
}

async function postarPublicacao() {
    const descricao = document.querySelector('textarea').value
    if (!descricao) return alert('Escreva algo antes de postar!')

    const dataPublicacao = new Date().toISOString().split('T')[0]
    const userId = getUserId()

    if (!userId) {
        return alert('Você precisa estar logado para postar!')
    }

    const novaPublicacao = {
        descricao,
        dataPublicacao,
        imagem: 'https://www.aluralingua.com.br/artigos/assets/professor.jpg',
        local: 'Faculdade',
        idUsuario: userId
    }

    const response = await fetch(`${baseURL}/cadastrarPublicacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaPublicacao)
    })

    if (response.ok) {
        carregarPublicacoes()
        document.querySelector('textarea').value = ''
    } else {
        alert('Erro ao postar a publicação')
    }
}

async function curtirPublicacao(idPublicacao, likeCountElement, userId) {
    const response = await fetch(`${baseURL}/likePublicacao/${idPublicacao}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: userId })
    })

    if (response.ok) {
        let currentLikes = parseInt(likeCountElement.textContent.split(' ')[1]) || 0
        likeCountElement.textContent = `Likes: ${currentLikes + 1}`
    } else {
        alert('Erro ao curtir a publicação')
    }
}

function abrirDropdownComentario(idPublicacao) {
    let commentBox = document.getElementById('comment-box')

    if (!commentBox) {
        commentBox = document.createElement('div')
        commentBox.id = 'comment-box'
        commentBox.classList.add('comment-box')
        document.body.appendChild(commentBox)
    }

    commentBox.innerHTML = `
        <div class="comment-content">
            <h3>Comentar Publicação</h3>
            <textarea id="comment-text" rows="3" placeholder="Digite seu comentário..."></textarea>
            <button onclick="enviarComentario(${idPublicacao})">Enviar</button>
            <button onclick="fecharDropdownComentario()">Fechar</button>
        </div>
    `

    commentBox.style.display = 'block'
}

function fecharDropdownComentario() {
    document.getElementById('comment-box').style.display = 'none'
}

async function enviarComentario(idPublicacao) {
    const descricao = document.getElementById('comment-text').value
    if (!descricao) return alert('Digite um comentário!')

    const userId = getUserId()
    if (!userId) {
        return alert('Você precisa estar logado para comentar!')
    }

    const response = await fetch(`${baseURL}/commentPublicacao/${idPublicacao}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: userId, descricao })
    })

    if (response.ok) {
        alert('Comentário enviado!')
        fecharDropdownComentario()
    } else {
        alert('Erro ao comentar')
    }
}
document.querySelector('.tweet-button').addEventListener('click', postarPublicacao)
document.addEventListener('DOMContentLoaded', carregarPublicacoes)