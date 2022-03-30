class ToResearch{
    /** Active la recherche dès qu'un mot est tapé ou un tag selectionné */
    toResearch(searchedKeyword, recipesSection, recipes, keywordObjectArray){
        // var inputValue = searchedKeyword;
        // var tagValue = searchedKeyword.textContent; 
        var recipesFound = [];
        /** si mot saisie sup à 2 caract ou tag choisi 
         *  || tagValue != undefined
         */
        if (searchedKeyword.length > 2) {
            /** valeur soit de la barre princ soit du tag
             *  var input = tagValue ? tagValue : inputValue;
             */
            //Récupération des ids recette du mot correspondant au mot recherché
            /**calcul le temps de chargement */
            console.time("search");
            var ids = new BinarySearch().binarySearchMultiple(keywordObjectArray, searchedKeyword.toLowerCase());
            console.timeEnd("search");
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