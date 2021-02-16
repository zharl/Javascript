
    // Create Dino Constructor
    function Dino(dino){
        this.species = dino.species;
        this.height = dino.height;
        this.weight = dino.weight;
        this.diet = dino.diet;
        this.where = dino.where;
        this.when = dino.when;
        this.fact = dino.fact;
    }
    // Create Dino Objects
    async function createDinos() {
        let dinoData = []; // used to store dinos
        await fetch('./dino.json')
            .then(res => res.json())
            .then(data => {
                // make use of array map to create dinos and save them to the
                // dinoData array
                dinoData = data.Dinos.map(dino => new Dino(dino));
            });
    return dinoData;
    }
    // Create Human Object
    function Human(){
        this.name = document.getElementById('name').value;
        this.height = document.getElementById('feet').value*12 + Number(document.getElementById('inches').value);
        this.weight = Number(document.getElementById('weight').value);
        this.diet = document.getElementById('diet').value;
    }
    // Use IIFE to get human data from form
    window.onload = async function(){
        this.dinos = await createDinos();
    };
    (function(){
        document.getElementById('btn').addEventListener('click', clicked);
    })();
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareWeight(human, dino){
        ratio = dino.weight / (human.weight + .0001);
        return `The species ${dino.species} weighed ${ratio.toFixed(1)} times as much as you`
    }
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(human, dino){
        ratio = dino.height / (human.height + .0001);
        return `The species ${dino.species} stood ${ratio.toFixed(1)} times as tall as you`
    }    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet(human, dino){
        return `The ${dino.species} was an ${dino.diet} whereas you report to be an ${human.diet}`
    }
    // Generate Tiles for each Dino in Array
    function createTile(i, dino, human) {
        // Project requirement is that pigeon should always return the same fact,
        // so we rig the random number for pigeon
        // Dinosaurs each return one of 6 facts randomly chosen here
        const newDiv = document.createElement('div');
        if (i===4){
            newDiv.className = 'grid-item';
            newDiv.innerHTML =  `<h3>Human</h3>`+
                                `<img src="images/human.png" ` +
                                `alt="image of human"><p>${human.name}</p>`;            
        } else {             
            const n = (dino.species === 'Pigeon' ? 2 : Math.round(Math.random() * 5));
            const facts = [
                `The ${dino.species} lived in ${dino.where}.`,
                `The ${dino.species} lived in the ${dino.when} period.`,
                dino.fact,
                compareWeight(human,dino),
                compareHeight(human,dino),
                compareDiet(human,dino)
            ];
            // Create the new grid item with title, image, and chosen fact
            newDiv.className = 'grid-item';
            newDiv.innerHTML =  `<h3>${dino.species}</h3>`+
                                `<img src="images/${(dino.species.toLowerCase())}.png" ` +
                                `alt="image of ${dino.species}"><p>${facts[n]}</p>`;    
        }
        return newDiv;
    }
    // Add tiles to DOM
    function addTilesToDOM(){
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 9; i++) {
            // Center space (5th element, index 4) is always the human
            fragment.appendChild(createTile(i, dinos[i], human));
        }
        // Attach fragment with grid elements to the DOM
        document.getElementById('grid').appendChild(fragment);
    }
    // On button click, prepare and display infographic
    function clicked(e) {
        human = new Human(); // Create the human from the form data
        dinos.splice(4,0,human); // Add the human to the array of dinos built onload
        document.querySelector('form').style.display = 'none'; // Remove form from screen
        addTilesToDOM();
    }