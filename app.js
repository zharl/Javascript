
    // Create Dino Constructor
    function Dino(dino){
        this.species = dino.species;
        this.height = dino.height;
        this.weight = dino.weight;
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
    function createHuman(){
        const humanData = {
            name: document.getElementById('name').value,
            height: document.getElementById('feet').value*12 + Number(document.getElementById('inches').value),
            weight: document.getElementById('weight').value,
            diet: document.getElementById('diet').value,
        };
        return humanData;
    }

    async function clicked(e) {
        //human = createHuman()
        dinos = await createDinos();
        dinos.forEach(dino => {
            console.log(dino);
        });
    }

    // Use IIFE to get human data from form
    (function(){
        document.getElementById('btn').addEventListener('click', clicked);
    })();

   
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
