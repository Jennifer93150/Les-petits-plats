class RecipesCard {
    constructor(recipe, ingredientsByRecipe, ustensilsArray) { 
        this._recipe = recipe;
        this._ingredientsByRecipe = ingredientsByRecipe;
        this._ustensilsArray = ustensilsArray;
    }
// Création de la carte recette
    createRecipeCard() {
        const recipesSection = document.getElementById("section-recipes");
        const article = document.createElement('article');
        const divText = document.createElement('div');
        const divHiddenApp = document.createElement('div');
        const divHiddenUst = document.createElement('div');
        article.classList.add('card-recipe','mb-5', 'bg-secondary', 'bg-opacity-25');
        divText.classList.add('ingredient-recipe');
        /**
         * Appareils & ustensiles
         * Partie masquée (cela sert à recup les appareils & ustensiles
         * de chq recette restantes pr les afficher facilement ds la liste de mots clés )
         */
        divHiddenApp.classList.add('appliance');
        divHiddenApp.style.display='none';
        divHiddenApp.innerHTML= this._recipe.appliance;
        divHiddenUst.style.display='none';
        // Pr chq ustensils de chq recette 
        var ustensil =[];
        for(var i=0; i<this._recipe.ustensils.length; i++){
            ustensil.push("<p class='mb-0'><span class='fw-bold ustensil'>"
            +this._recipe.ustensils[i].charAt(0).toUpperCase()+
            this._recipe.ustensils[i].slice(1)+"</span>"+"</p>");
            // retire les virgules du tableau à l'affichage
            divHiddenUst.innerHTML = ustensil.join("");
        };

        // Recup ingredients de chq recette avec quantité et unité de mesure
        var ingredient =[];
        for(var i=0; i<this._ingredientsByRecipe.length; i++){
            // si il contient une unité de mesure affiche l'ingredient, sa quantité et sa mesure
            if(this._ingredientsByRecipe[i].unit){
                ingredient.push("<p class='mb-0'><span class='fw-bold ingredient'>"
                +this._ingredientsByRecipe[i].ingredient+"</span>"
                + " : "+ this._ingredientsByRecipe[i].quantity 
                + " "+ this._ingredientsByRecipe[i].unit
                +"</p>");
            // si juste une quantité affiche l'ingredient et sa quantité
            }else if(this._ingredientsByRecipe[i].quantity){
                ingredient.push("<p class='mb-0'><span class='fw-bold ingredient'>"
                +this._ingredientsByRecipe[i].ingredient+"</span>"
                + " : "+this._ingredientsByRecipe[i].quantity
                +"</p>");
            // si juste un ingredient, affiche le
            }else{
                ingredient.push("<p class='mb-0'><span class='fw-bold ingredient'>"
                +this._ingredientsByRecipe[i].ingredient+"</span></p>");
            }
            // retire les virgules du tableau à l'affichage
            divText.innerHTML = ingredient.join("");
        };

        recipesSection.appendChild(article);
        
        const recipeCard = 
        `
            <div class="img-recipe"></div>
            <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <h5 class="title-recipe card-title mb-0">${this._recipe.name}</h5>
                    <div class="d-flex align-items-center">
                        <i class="far fa-clock fs-3  me-2"></i>
                        <p class="time-recipe fs-4 fw-bold mb-0">${this._recipe.time} min</p>
                    </div>
                </div>
                <div class="d-flex">
                    ${divText.outerHTML}
                    ${divHiddenApp.outerHTML}
                    ${divHiddenUst.outerHTML}
                    <p class="desc-recipe">${this._recipe.description}</p>
                </div>
            </div>
        `;
        article.innerHTML = recipeCard;
        return article;
    }
}
