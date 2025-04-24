"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const userId = 1
    fetchProfileData(userId);
});

async function fetchProfileData(userId) {
    const url = `https://back-spider.vercel.app/user/pesquisarUser/${userId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Não foi possível carregar as informações do perfil.");
        }

        const data = await response.json();
        displayProfileData(data);
    } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error.message);
    }
}

function displayProfileData(data) {
    const banner = document.getElementById("banner");
    const foto = document.getElementById("foto");
    const editarPerfil = document.getElementById("editar-perfil");

    const profileImage = data.imagemPerfil || "default_image.jpg";
    const name = data.nome || "Nome do Usuário";

    if (banner) banner.style.backgroundImage = `url(${profileImage})`;
    if (foto) foto.style.backgroundImage = `url(${profileImage})`;
    if (editarPerfil) editarPerfil.value = name;
}
