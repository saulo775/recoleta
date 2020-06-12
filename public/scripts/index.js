const buttonSearch = document.querySelector("#page_home main a")
const modal = document.querySelector("#modal")
const fecharModal = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("active")
})

fecharModal.addEventListener("click", () => {
    modal.classList.add("active")
})



