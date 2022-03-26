class RecipesSorted {
    /** ici besoin du tab trié et la section qui contiendra les recettes */
    constructor(recipesSorted, recipesSection) { 
        this._recipesSorted = recipesSorted;
        this._recipesSection = recipesSection;
    }
    // Création des cartes recette triées
    createRecipeCardsSorted(){
        // Vérif si tableau contient des recettes filtrées
        if (this._recipesSorted.length > 0) {
            // si oui créer les cartes recettes correspondantes
            this._recipesSection.innerHTML = "";
            this._recipesSorted.forEach(recipe => {
                if(recipe !== undefined){
                    const recipeModel = new RecipesCard(recipe, recipe.ingredients);
                    const recipeCardDOM = recipeModel.createRecipeCard();
                    this._recipesSection.appendChild(recipeCardDOM);
                }
                
            });
        }else{ 
            /** si tab vide dc pas de recette correspondantes trouvés, affiche un msg*/
            this._recipesSection.innerHTML = "<p id='msg-result'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>";
        }
    }
}
