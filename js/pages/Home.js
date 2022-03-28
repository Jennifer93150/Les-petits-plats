import {recipes} from './../../datas/recipes.js';
/**
 * Récupération des elts dont j'ai besoin
 */
const recipesSection = document.getElementById('section-recipes');
// Champs ingredient
const btnSearchIng = document.getElementById('btn-search-ing')
const containerItemsIng = document.getElementById('container-items-ing');
const containerSearchIng = document.getElementById('container-search-ing');
const inputSearchIng = document.getElementById('input-search-ing');
const WrapperSearchFieldIng = document.getElementById('container-search-ing');
// Champs appareil
const btnSearchApp = document.getElementById('btn-search-app')
const containerItemsApp = document.getElementById('container-items-app');
const containerSearchApp = document.getElementById('container-search-app');
const inputSearchApp = document.getElementById('input-search-app');
const WrapperSearchFieldApp = document.getElementById('container-search-app');
// Champs ustensile
const btnSearchUst = document.getElementById('btn-search-ust')
const containerItemsUst = document.getElementById('container-items-ust');
const containerSearchUst = document.getElementById('container-search-ust');
const inputSearchUst = document.getElementById('input-search-ust');
const WrapperSearchFieldUst = document.getElementById('container-search-ust');
const classLi = 'item';
/** Input barre principale */
const inputSearch = document.getElementById('input-search');

/**
 * Création de tableaux vides qui stockent chq elt distinct
 * (titre, ingredient, appareils, ustensile,...)
 */
var namesArray = [];
var descriptionArray = [];
/** Non utilisé
 * 
 * var appliancesArray = [];
 * var ustensilsArray = [];
 */
 var ingredientsArray = [];
recipes.forEach(recipe => {
    /**
     *  Recupération de chq titre & description, envoie ds tableau
     */ 
    namesArray.push(recipe.name.toLowerCase());
    descriptionArray.push(recipe.description.toLowerCase());
    /**
     * 
     * appliancesArray.push(recipe.appliance);
     * ustensilsArray.push(recipe.ustensils);
     */
     ingredientsArray.push(recipe.ingredients);
    /**
     * Creation des cartes recette
     */
    const recipeModel = new RecipesCard(recipe, recipe.ingredients, recipe.ustensils);
    const recipeCardDOM = recipeModel.createRecipeCard();
    recipesSection.appendChild(recipeCardDOM);
});
/** Récupérer l'id, le titre, ingrédients, et description du tab recipes */
function createArrOfKeywords(recipesArray){
	var arrOrderedKeywords = [];
	for (var i = 0; i < recipesArray.length; i++) {
        /** transforme mon ss tab ing en tab simple comportant juste les mots clés ing */
        var onlyIngredients = recipesArray[i].ingredients.map(recipe => recipe.ingredient.toLowerCase()).flat();
        var onlyUstensils = recipesArray[i].ustensils.map(ustensil => ustensil);
        /** reunis les infos en une seule phrase */
        var totalRecipeWords = recipesArray[i].name+" "+onlyIngredients+" "+
                               recipesArray[i].description +" " +recipesArray[i].appliance;
        /** coupe la phrase en +sieurs mots clés et mets les ds 1 tab */
        var keywords = [...new Set(totalRecipeWords.toLowerCase().split(/[\s,().]+/))];
        /** rajoute encore les ingredients mais en mot entier*/
        var concatOnlyIngredients = keywords.concat(onlyIngredients);
        /** rajoute la description en entièré sans coupure */
        var concatOnlyDescription = concatOnlyIngredients.concat(recipesArray[i].description);
        /** rajoute les ustensiles */
        var totalKeywords = concatOnlyDescription.concat(onlyUstensils);
        /** range par ordre alpha */
        var orderedKeywords = totalKeywords.sort();
        /** cree données clé, valeur */
        var keywordsOfEachRecipe = ({ "id" : recipesArray[i].id, "keyword": orderedKeywords});
        /** push ds array */
		arrOrderedKeywords.push(keywordsOfEachRecipe);
	};
	return arrOrderedKeywords;
}
/** crée un tab avec ts mots clés*/
var arrOfKeywords = createArrOfKeywords(recipes);
/** recup uniqmt propriété keyword du tab ["id":...,"keyword":...]et mettre ds new tab*/
var allKeywords = [];
arrOfKeywords.forEach(elt => {
    allKeywords.push(elt.keyword);
});
/** supprime les ss tab pour faire seul tab */
/** tableau avec ts les mots clés de ttes recettes  */
var flatArrOfKeywords = [...new Set(allKeywords.flat().sort())];

/** Création d'un nouveau tableau ac ts mots clés et leurs ids 
 * correspondant à chq recette où ils se trouvent
 * ex: blender se trouve ds la recette 1, 17, 18....
*/
function KeywordObject(item) {
	//item = mot clé
	this.keyword = item;
	let recipeIds = [];
	for (var i=0; i < arrOfKeywords.length; i++) {
		/**si l'index du mot clé est > ou = à 0, (en gros si le mot clé est ds le tableau courant) */
		if (arrOfKeywords[i].keyword.indexOf(item) >= 0 ) {
			/** alors push son id ds le new tab */
			recipeIds.push(arrOfKeywords[i].id);
		}
	}
	this.ids = recipeIds;
}
var keywordArray = (arr) => {
	var newArr = [];
	for (var i=0; i<arr.length; i++) {
		var keyword = new KeywordObject(arr[i]);
		newArr.push(keyword);
	}
	return newArr;
}
/**Tableau ac ts mots clés et leurs ids*/
let keywordObjectArray = keywordArray(flatArrOfKeywords);

/** autocomplétion pr la barre principale 
 * (fonctionne mais rajouter pr + tard l'envoie
 * de la valeur du mot sur lequel on clic ds la liste 
 * new Autocompletion().autocomplete(inputSearch, flatArrOfKeywords, 2);
 */

var recipesSorted = [];
var research = new ToResearch();
/** Activation de la recherche à la saisie dans la barre principale */ 
inputSearch.addEventListener("keyup", function(e) {
    recipesSorted = research.toResearch(e.target.value, recipesSection, recipes, keywordObjectArray);
});

/** Création des champs de tag: ingrédient, appareils & ustensiles */
createAllSearchField()
function createAllSearchField(){
    /**
     *  INGREDIENTS (inutile pr momt)
     * Parcours tableau ingredients, recup chq elt et push ds le new tab.
     * Suppression doublons d'ingredients.
     * Création liste ds champs ingrédient.
     * Filtre les cartes recette et les listes d'ing, 
     * d'app et d'ust en fonction du mot tapé.
     * var allIngredients = [];
        for (let i = 0; i < ingredientsArray.length; i++) {
            for (let j = 0; j < ingredientsArray[i].length; j++) {
                allIngredients.push(ingredientsArray[i][j].ingredient)
            };
        };
        const newIngredientsArray = Array.from(new Set(allIngredients));
        const newArray = newIngredientsArray.sort();
    */
   var choicesIng = '.ingredient';
    new SearchField(choicesIng, containerItemsIng, classLi+"-ing", btnSearchIng, 
        containerSearchIng, btnSearchApp, btnSearchUst, WrapperSearchFieldApp, WrapperSearchFieldUst,
        inputSearchIng).searchFieldDisplay();

    /**
     * APPAREILS
     * Suppression des doublons du tab d'appareils
     * Création liste ds champs appareils
     * const newAppliancesArray = Array.from(new Set(appliancesArray));
     */
    var choicesApp = '.appliance';
    new SearchField(choicesApp, containerItemsApp, classLi+"-app", btnSearchApp, 
        containerSearchApp, btnSearchIng, btnSearchUst, 
        WrapperSearchFieldIng, WrapperSearchFieldUst,
        inputSearchApp).searchFieldDisplay();

    /**
     *  USTENSILES
     * Parcours tableau d'ustensils, recup chq elt et push ds le new tab
     * Suppression doublons du tab d'ustensils
     * Création liste ds champs ustensiles
     * var allUstensils = [];
        for (let i = 0; i < ustensilsArray.length; i++) {
            for (let j = 0; j < ustensilsArray[i].length; j++) {
                allUstensils.push(ustensilsArray[i][j])
            };
        };
        const newUstensilsArray = Array.from(new Set(allUstensils));
        var ustensil;
        for(var i=0; i< newUstensilsArray.length; i++){
            ustensil = newUstensilsArray[i];
        };
    */
    var choicesUst ='.ustensil';
    new SearchField(choicesUst, containerItemsUst, classLi+"-ust", btnSearchUst, 
        containerSearchUst, btnSearchApp, btnSearchIng, WrapperSearchFieldIng, 
        WrapperSearchFieldApp,inputSearchUst).searchFieldDisplay();
}

/** CREATION DES TAGS 
 * création d'un tableau qui contiendra
 * les recettes filtrées
*/

var arrayTagAndItsRecipes = [];
var recipesSortedWithInputAndOneTag = [];
var recipesSortedWithTags = [];
listenTag();
const wrapperTag = document.getElementById('wrapper-tag-btn');

// Ecoute si un mot clé dans les champs de recherche est selectionné
function listenTag(){
    // au clic sur un mot clé
    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('list-item')){
            // crée un tag
            createTag(e.target);
            // filtre les recettes en fonction du/des tag choisi
            /** Si les recettes n'ont pas été filtrées (dc recipesSorted vide)*/
            if(recipesSorted.length == 0){
                /** Lance la recherche avec les 50 recettes => recipes (contient les 50 recettes)*/
                recipesSorted = research.toResearch(e.target.textContent, recipesSection, recipes, keywordObjectArray);
                /** création tab avec tag et leur tab de recette associé */
                arrayTagAndItsRecipes.push({
                    "tag":e.target.textContent.toLowerCase(),
                    "array":recipesSorted
                });
            }else{
                /** Ici recettes déjà filtrées soit par la valeur input soit par 1 tag */
                /** si 1 tag  */
                if(wrapperTag.childNodes.length == 1){
                    /** lance rech. avec tab dejà trié en fonction du tag choisi */
                    recipesSorted = research.toResearch(e.target.textContent, recipesSection, recipesSorted, keywordObjectArray);
                    /** ce tab servira en cas de suppression d'un tag */
                    recipesSortedWithInputAndOneTag = research.toResearch(e.target.textContent, recipesSection, recipesSorted, keywordObjectArray);
                }
                /** Si valeur ds input ou + qu'1 tag, lance la recherche avec les recettes déjà filtrées 
                   * sorted => contiendra des recettes filtrées car une valeur ds input ou plusieurs tags auront été   choisi, dc une recherche aura déjà été effectué
                   * On effectue donc une nouvelle recherche en prenant en compte les 1ers tag choisi
                   */
                recipesSorted = research.toResearch(e.target.textContent, recipesSection, recipesSorted,keywordObjectArray);
                recipesSortedWithTags = research.toResearch(e.target.textContent, recipesSection, recipesSorted,keywordObjectArray);
                 /** création tab avec tag et leur tab de recette associé trié*/
                arrayTagAndItsRecipes.push({
                    "tag":e.target.textContent.toLowerCase(),
                    "array":recipesSorted
                });
            }
        /** si clic sur un mot clé et que l'input princ est rempli */
        }
        if(e.target.classList.contains('tag-btn')){
            // supprime le tag au clic dessus
            closeTag(e.target);
        }
    });
};
/** crée un bouton tag */
function createTag(tag){
    const div = document.getElementById('wrapper-tag-btn');
    const btnTag = document.createElement('button');
    const allStyle = getComputedStyle(tag.parentNode.parentElement);
    btnTag.classList.add('tag-btn','fs-5', 'm-2');
    btnTag.style.backgroundColor = allStyle.getPropertyValue("background-color");
    var text = tag.textContent;
    btnTag.setAttribute('id', text);
    btnTag.innerHTML = text ;
    //+ " <i class='fa-regular fa-circle-xmark'></i>"
    div.appendChild(btnTag);
};

/** ferme le tag au clic dessus */
function closeTag(Tag){
    /** si tag existe */
    if(wrapperTag.hasChildNodes(Tag)){
        /** supprime le */
        wrapperTag.removeChild(Tag);
        /** recup le tag en question en minuscule */
        var tagLowerCase = Tag.textContent.toLowerCase();
        /** pr chq tag et son tab de recette */
        for(var i=0; i < arrayTagAndItsRecipes.length; i++){
            /**si l'elt courant du tab = au tag supprimé */
            if(arrayTagAndItsRecipes[i].tag == tagLowerCase){
                /** retient son id */
                var index = arrayTagAndItsRecipes.indexOf(arrayTagAndItsRecipes[i]);
                if (index > -1) {
                    /** et supp le du tab */
                    arrayTagAndItsRecipes.splice(index, 1);
                }
            }
        }
        /** reinitialise le filtre */
        removeFilterOfTag(arrayTagAndItsRecipes);
    };
}
// Fonction de suppression du filtre en cas de suppression d'un tag
function removeFilterOfTag(arrayTagAndItsRecipes){
     var recipesUnfiltred = [];
    /** si pas de tag à la suppr et que l'input princ est rempli*/
    if(!wrapperTag.hasChildNodes() && inputSearch.value.length > 2){
        /** lance rech. avec les 50 recettes en fonction de la valeur de l'input */
        recipesUnfiltred = research.toResearch(inputSearch.value, recipesSection, recipes, keywordObjectArray);
    /** si reste 1 ou plusieurs tag à la suppr et que l'input est rempli*/
    }else if(wrapperTag.childNodes.length != 0 && inputSearch.value.length > 2){
        /** lance rech. avec tab recettes filtrées pécédemment avec un tag en fonction du seul tag restant*/
        recipesUnfiltred = research.toResearch(wrapperTag.lastChild.textContent, recipesSection, recipesSortedWithInputAndOneTag, keywordObjectArray);
    /**si le nbr de tag est sup à 1 après la suppression d'un tag */
    }else if(wrapperTag.childNodes.length > 1){
        var lastTagAdded = wrapperTag.lastChild.textContent.toLowerCase();
        for(var i=0; i < arrayTagAndItsRecipes.length; i++){
            recipesUnfiltred = arrayTagAndItsRecipes[0].array;
        };
        /** Lance la recherche avec les tags restants*/
        recipesUnfiltred = research.toResearch(lastTagAdded, recipesSection, recipesUnfiltred, keywordObjectArray);
    /** si à la suppression il reste 1 tag sans valeur ds input*/
    }else if(wrapperTag.childNodes.length == 1){
        /** lance rech. avec les 50 recette en fonction du tag*/
        recipesSorted = research.toResearch(wrapperTag.childNodes[0], recipesSection, recipes, keywordObjectArray); 
    }else{/** si rien ds input ni aucun tag, reaffiche ttes les recettes */
        recipes.forEach(recipe => {
            const recipeModel = new RecipesCard(recipe, recipe.ingredients);
            const recipeCardDOM = recipeModel.createRecipeCard();
            recipesSection.appendChild(recipeCardDOM);
        });
        /** recreer les champs ing, app, ust */
        createAllSearchField();
    }
}
