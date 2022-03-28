//import { recipes } from "../../datas/recipes";

class LinearSearch{
    /** Recherche séquentielle (ligne par ligne) */
      linearSearch(recipes, searchedKeyword){
        // console.log(searchedKeyword)
        // console.log(recipes)
        var recipesSorted = [];
        /** Pr chq elt du tab */
        recipes.forEach((element, index)=>{
          /** verif si le mot clé courant correspond au mot recherché */
          if(element.keyword.toLowerCase().includes(searchedKeyword)){
            /** si oui retient ses ids recettes */
            recipesSorted.push(recipes[index].ids);
          }
        });
        return [...new Set(recipesSorted.flat())];
      }
  }
  