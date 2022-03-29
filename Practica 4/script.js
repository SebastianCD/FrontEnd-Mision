var numPokemon = 0;

const fetchPokemon = () => {
    play();
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    console.log(url);
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            numPokemon = data.id;
            let pokeData = data.id + ' - ' + data.species.name.toUpperCase();
            newData(pokeData);
            console.log(pokeData);
            pokeImage(pokeImg);
            console.log(pokeImg);
            if(data.types.length > 0){
                let type1 = data.types[0].type.name;
                const typeOne = document.getElementById("type1"); 
                typeOne.src = getAssetType(type1);
                console.log(typeOne.src);
            }
            let type1 = data.types[0].type.name;
            const typeOne = document.getElementById("type1"); 
            let type2;
            const typeTwo = document.getElementById("type2"); 
            if(data.types.length == 1){ 
                typeOne.src = getAssetType(type1);
                console.log(typeOne.src);
                typeTwo.src = 'https://cdn2.bulbagarden.net/upload/3/3c/UnknownIC_Big.png';
                console.log(typeTwo.src);
            }
            if(data.types.length == 2){
                type2 = data.types[1].type.name; 
                typeOne.src = getAssetType(type1);
                console.log(typeOne.src);
                typeTwo.src = getAssetType(type2);
                console.log(typeTwo.src);
            }
            fetchData();
            let estadisticasURL = data.stats;
            estadisticas(estadisticasURL);
            document.getElementById("peso").textContent = "Weight: " + data.weight/10 + "kg";
            document.getElementById("altura").textContent = "Height: " + data.height/10 + "m";
        }
    });
}

const estadisticas = (url) =>{
    document.getElementById("hp").value = url[0].base_stat;
    document.getElementById("attack").value = url[1].base_stat;
    document.getElementById("defense").value = url[2].base_stat;
    document.getElementById("sa").value = url[3].base_stat;
    document.getElementById("sd").value = url[4].base_stat;
    document.getElementById("speed").value = url[5].base_stat;
}

const newData = (info) => {
    const pokeId = document.getElementById("pokeId"); 
    pokeId.textContent = info;
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

function getAssetType(type){
    switch(type){
      case 'normal':
        return 'https://cdn2.bulbagarden.net/upload/3/39/NormalIC_Big.png';
      case 'fighting':
        return 'https://cdn2.bulbagarden.net/upload/6/67/FightingIC_Big.png';
      case 'flying':
        return 'https://cdn2.bulbagarden.net/upload/c/cb/FlyingIC_Big.png';
      case 'poison':
        return 'https://cdn2.bulbagarden.net/upload/3/3d/PoisonIC_Big.png';
      case 'ground':
        return 'https://cdn2.bulbagarden.net/upload/8/8f/GroundIC_Big.png';
      case 'rock':
        return 'https://cdn2.bulbagarden.net/upload/c/ce/RockIC_Big.png';
      case 'bug':
        return 'https://cdn2.bulbagarden.net/upload/c/c8/BugIC_Big.png';
      case 'ghost':
        return 'https://cdn2.bulbagarden.net/upload/7/73/GhostIC_Big.png';
      case 'steel':
        return 'https://cdn2.bulbagarden.net/upload/d/d4/SteelIC_Big.png';
      case 'fire':
        return 'https://cdn2.bulbagarden.net/upload/2/26/FireIC_Big.png';
      case 'water':
        return 'https://cdn2.bulbagarden.net/upload/5/56/WaterIC_Big.png';
      case 'grass':
        return 'https://cdn2.bulbagarden.net/upload/7/74/GrassIC_Big.png';
      case 'electric':
        return 'https://cdn2.bulbagarden.net/upload/4/4a/ElectricIC_Big.png';
      case 'psychic':
        return 'https://cdn2.bulbagarden.net/upload/6/60/PsychicIC_Big.png';
      case 'ice':
        return 'https://cdn2.bulbagarden.net/upload/6/6f/IceIC_Big.png';
      case 'dragon':
        return 'https://cdn2.bulbagarden.net/upload/4/48/DragonIC_Big.png';
      case 'dark':
        return 'https://cdn2.bulbagarden.net/upload/5/56/DarkIC_Big.png';
      case 'fairy':
        return 'https://cdn2.bulbagarden.net/upload/d/df/Picross_FairyIC.png';
      default:
        return 'https://cdn2.bulbagarden.net/upload/3/3c/UnknownIC_Big.png';
    }
  }

  function play() {
    var audio = new Audio('poke.mp3');
    audio.play();
  }

  const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + numPokemon)
    .then((response) => response.json())
    .then((data) => {
        var description = data.flavor_text_entries.find((text_entry) => text_entry.language.name === 'en').flavor_text;
        description = description.replace(/\n/g, ' ').replace(/\f/g, ' ');
        document.getElementById("desc").textContent = description;
    });
}