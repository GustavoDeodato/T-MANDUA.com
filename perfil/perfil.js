"use strict"

async function fetchProfileData(userId) {
    try {
        const url = `https://back-spider.vercel.app/${userId}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Não foi possível carregar as informações do perfil")
        }

        const data = await response.json()
        displayProfileData(data)
    } catch (error) {
        console.error(error)
    }
}

function displayProfileData(data) {
    const banner = document.getElementById('banner')
    const foto = document.getElementById('foto')
    const editarPerfil = document.getElementById('editar-perfil')
    const profileImage = data.imagemPerfil || 'default_image.jpg'
    const name = data.nome || 'Nome do Usuário'

    banner.style.backgroundImage = `url(${profileImage})`
    foto.style.backgroundImage = `url(${profileImage})`
    editarPerfil.value = name;
}

function getUserFromStorage() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

document.addEventListener("DOMContentLoaded", () => {
    const user = getUserFromStorage();

    if (user && user.id) {
        fetchProfileData(user.id);
    } else {
        console.log("Usuário não encontrado ou ID ausente no localStorage.");
    }
})
