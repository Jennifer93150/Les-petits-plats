class ToResearch{
    /** Active la recherche dès qu'un mot est tapé ou un tag selectionné */
    toResearch(searchedKeyword, recipesSection, recipes, keywordObjectArray){
        var inputValue = searchedKeyword.value;
        var tagValue = searchedKeyword.textContent; 
        var keyword = searchedKeyword;
        var recipesFound = [];
        /** si mot saisie ou tag choisi sup à 2 caract*/
        if (keyword != undefined  ||  tagValue && tagValue!=undefined || inputValue.length > 2 && inputValue!=undefined) {
            /** valeur soit de la barre princ soit du tag*/
            var input = tagValue ? tagValue : inputValue || keyword;
            //Récupération des ids recette du mot correspondant au mot recherché
            var ids = new LinearSearch().linearSearch(keywordObjectArray, input.toLowerCase());
            // Si il existe des ids recette, je crée un tableau avec
            if(ids){
                for(var i = 0; i < ids.length ; i++){
                    /** les ids des recettes trouvés où le mot recherché est contenu */
                    var id = ids[i];
                    if(recipes.filter(r => r.id == id)[0] != undefined){
                        /** tableau des recettes filtées;
                         * filter: pr chq id d'une recette celui doit ê = à id trouvé
                         * [0] permet de donner le premier elt du tab filter renvoyé
                         */
                        recipesFound.push(recipes.filter(r => r.id == id)[0]);
                    };
                }; 
                new RecipesSorted(recipesFound, recipesSection).createRecipeCardsSorted();
            }
        }else {
            /** sinon retourne les 50 recettes */
            recipesSection.innerHTML = "";
            recipes.forEach(recipe => {
                const recipeModel = new RecipesCard(recipe, recipe.ingredients);
                const recipeCardDOM = recipeModel.createRecipeCard();
                recipesSection.appendChild(recipeCardDOM);
            });
        }
        /** retourne le tab de recette filtré */
        return recipesFound;
   }
}