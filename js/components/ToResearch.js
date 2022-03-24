class ToResearch{
    /** Active la recherche dès qu'un mot est tapé ou un tag selectionné */
    toResearch(e, searchedKeyword, recipesSection, recipes, keywordObjectArray){
        var inputValue = searchedKeyword.value;
        var tagValue = searchedKeyword.innerText; 
        var recipesFound = [];
        /** si mot saisie ou tag choisi sup à 2 caract
         * voir si ajout => || tagValue
         */
        if (inputValue.length > 2 || tagValue) {
            /** valeur soit de la barre princ soit du tag*/
            var input = tagValue ? tagValue : inputValue;
            //Récupération des ids recette du mot correspondant au mot recherché
            var ids = new LinearSearch().linearSearch(keywordObjectArray, input.toLowerCase());
            // Si il existe des ids recette, je crée un tableau avec
            if(ids){
                for(var i = 0; i < ids.length ; i++){
                    var id = ids[i];
                    recipesFound.push(recipes.filter(r => r.id == id)[0]);
                }; 
                new RecipesSorted(recipes, recipesFound, recipesSection).createRecipeCardsSorted();
            }
        }else {
            recipesSection.innerHTML = "";
            recipes.forEach(recipe => {
                const recipeModel = new RecipesCard(recipe, recipe.ingredients);
                const recipeCardDOM = recipeModel.createRecipeCard();
                recipesSection.appendChild(recipeCardDOM);
            });
        }
        return recipesFound
   }
}