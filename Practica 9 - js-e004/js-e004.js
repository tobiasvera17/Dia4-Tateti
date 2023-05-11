// let cuadro0 = document.getElementsByClassName("cuadro0")
// let cuadro1 = document.getElementsByClassName("cuadro1")
// let cuadro2 = document.getElementsByClassName("cuadro2")
// let cuadro3 = document.getElementsByClassName("cuadro3")
// let cuadro4 = document.getElementsByClassName("cuadro4")
// let cuadro5 = document.getElementsByClassName("cuadro5")
// let cuadro6 = document.getElementsByClassName("cuadro6")
// let cuadro7 = document.getElementsByClassName("cuadro7")
// let cuadro8 = document.getElementsByClassName("cuadro8")
container = document.getElementById("container")
namePlayer1 = document.getElementById("namePlayer1")
namePlayer2 = document.getElementById("namePlayer2")
playerX = document.getElementById("playerX")
playButton = document.getElementById("playButton")

let currentClick = 1
let playerIsX = ""
let player1Game = []
let player2Game = []
let winningGames = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

const displayGame = (player1Name, player2Name, xPlayer) => {
    container.innerHTML = ""
    containerGame = document.createElement('DIV')
    containerGame.setAttribute('id','containerGame')
    for(let i = 0; i < 9; i++){
        div = document.createElement('DIV')
        div.setAttribute('class', `cuadro cuadro${i}`)
        containerGame.appendChild(div)
    }
    let buttonRestart = document.createElement('BUTTON')
    buttonRestart.setAttribute("id","restartButton")
    buttonRestart.innerHTML = "Reiniciar"
    container.append(containerGame)
    container.append(buttonRestart)
    
    buttonRestart.addEventListener("click", () => {
        displayMenu()
    })

    playerIsX = xPlayer
    currentClick = 1
    player1Game = []
    player2Game = []

    let cuadro = document.querySelectorAll('.cuadro');
    
    cuadro.forEach(cuadro => {
        cuadro.addEventListener('click', function handleClick(event) {
            if(player1Game.length + player2Game.length >= 8){
                containerGame.innerHTML = ""       
                let div = document.createElement('DIV')
                div.setAttribute("class","winningLetter")
                div.innerHTML = `Empate`
                containerGame.append(div)
            }

            if(cuadro.classList.length <= 2){
                cuadro.setAttribute('style', 'background-color: lightpink;');
                cuadro.classList.add("clicked")
                let img = document.createElement('IMG')
                img.setAttribute("class", "icon-img")
                if(playerIsX == currentClick){
                    img.setAttribute("src","./images/X.png")
                }
                else{
                    img.setAttribute("src","./images/O.png")
                }
                cuadro.appendChild(img)

                if(currentClick == 1){
                    player1Game.push(Number(cuadro.classList[1][6]))
                    for(let i = 0; i < winningGames.length; i ++){
                        let count = 0;
                        for(let j = 0; j < winningGames[i].length; j ++){
                            if (player1Game.includes(winningGames[i][j])){
                                count++;                           
                            }
                        }
                        if(count == 3){
                            containerGame.innerHTML = ""       
                            let div = document.createElement('DIV')
                            div.setAttribute("class","winningLetter")
                            div.innerHTML = `El jugador 1 gana la partida`
                            containerGame.append(div)
                        }
                    }
                    currentClick = 2;
                }
                else if (currentClick == 2){
                    player2Game.push(Number(cuadro.classList[1][6]))
                    
                    for(let i = 0; i < winningGames.length; i ++){
                        let count = 0;
                        for(let j = 0; j < winningGames[i].length; j ++){
                            if (player2Game.includes(winningGames[i][j])){
                                count++;                           
                            }
                        }
                        if(count == 3){
                            containerGame.innerHTML = ""       
                            let div = document.createElement('DIV')
                            div.setAttribute("class","winningLetter")
                            div.innerHTML = `El jugador 2 gana la partida`
                            containerGame.append(div)
                        }
                    }
                    currentClick = 1;
                }    
            }
            });
    })
}

const displayMenu = () => {
    window.location.reload();
}

playButton.addEventListener("click", () => {
    if (namePlayer1.value != "" && namePlayer2.value != ""){
        displayGame(namePlayer1.value, namePlayer2.value, playerX.value)
    }else{
        alert("Ingresar todos los datos")
    }
})
