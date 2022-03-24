class ToResearch{
    toResearch(e, searchedKeyword, recipesSection, recipes, array){
        /** si mot saisie ou tag choisi sup à 2 caract */
        var inputValue = searchedKeyword.value;
        var tagValue = searchedKeyword.innerText; 
        var recipesFound = [];
        // voir si ajout => || tagValue
        if (inputValue.length > 2 ) {
            /** valeur saisie */
            var input = tagValue ? tagValue : inputValue;
            //Récupération des ids recette du mot correspondant au mot recherché
            var ids = new LinearSearch().linearSearch(array, input.toLowerCase());
            // Si il existe des ids recette je crée un tableau avec
            if(ids){
                for(var i = 0; i < ids.length ; i++){
                    var id = ids[i];
                    //recherche id-1 car recipes[id] correspond à la recette suivante
                    recipesFound.push(recipes[id-1]);
                }; 
            }
            // Vérif si tableau contient des elts
            if (recipesFound.length > 0) {
                // si oui créer les cartes recettes correspondantes
                this.createCardSorted(recipesFound, recipesSection);
            }else {// sinon renvoie un msg
                recipesSection.innerHTML = "<p id='msg-result'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>";
            }
        }else {
            this.createCardSorted(recipes, recipesSection);
        }
   }
   createCardSorted(recipes, recipesSection){
        recipesSection.innerHTML = "";
        recipes.forEach(recipe => {
            const recipeModel = new RecipesCard(recipe, recipe.ingredients);
            const recipeCardDOM = recipeModel.createRecipeCard();
            recipesSection.appendChild(recipeCardDOM);
        });
   }
}