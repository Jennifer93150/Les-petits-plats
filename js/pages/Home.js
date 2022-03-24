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
 * var ingredientsArray = [];
 * var appliancesArray = [];
 * var ustensilsArray = [];
 */

recipes.forEach(recipe => {
    /**
     *  Recupération de chq titre & description, envoie ds tableau
     */ 
    namesArray.push(recipe.name.toLowerCase());
    descriptionArray.push(recipe.description.toLowerCase());
    /**
     * ingredientsArray.push(recipe.ingredients);
     * appliancesArray.push(recipe.appliance);
     * ustensilsArray.push(recipe.ustensils);
     */
    
    /**
     * Creation des cartes recette
     */
    const recipeModel = new RecipesCard(recipe, recipe.ingredients, recipe.ustensils);
    const recipeCardDOM = recipeModel.createRecipeCard();
    recipesSection.appendChild(recipeCardDOM);
});
/** Récupérer l'id, le titre, ingrédients, et description du tab recipes */
function createArrOfKeywords(arr){
	var arrOrderedKeywords = [];
	for (var i = 0; i < arr.length; i++) {
        /** transforme mon ss tab ing en tab simple comportant juste les mots clés ing */
        var onlyIngredients = arr[i].ingredients.map(x => x.ingredient.toLowerCase()).flat();
        /** reunis les infos en une seule phrase */
        var totalRecipeWords = arr[i].name+" "+onlyIngredients+" "+arr[i].description;
        /** coupe la phrase en +sieurs mots clés et les mets ds 1 tab */
        var keywords = [...new Set(totalRecipeWords.toLowerCase().split(/[\s,().]+/))];
        var totalKeywords = keywords.concat(onlyIngredients);
        var flatTotalKeywords = totalKeywords.flat();
        /** range par ordre alpha */
        var orderedKeywords = flatTotalKeywords.sort();
        /** cree données clé, valeur */
        var keywordsOfEachRecipe = ({ "id" : arr[i].id, "keyword": orderedKeywords});
        /** push ds array */
		arrOrderedKeywords.push(keywordsOfEachRecipe);
	};
	return arrOrderedKeywords;
}
/** crée un tab des mots clés*/
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
	for (var i=0; i<arrOfKeywords.length; i++) {
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

/** Activation de la recherche à la saisie dans la barre principale */ 
inputSearch.addEventListener("keyup", function(e) {
    new ToResearch().toResearch(e, inputSearch, recipesSection, recipes, keywordObjectArray);
});

/** Création des champs de tag: ingrédient, appareils & ustensiles */
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

/** CREATION DES TAGS 
 * création d'un tableau qui contiendra
 * les recettes filtrées
*/
var sorted = [];
listenTag();

// crée les tag
function listenTag(){
    // au clic sur un mot clé
    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('list-item')){
            // crée un tag
            createTag(e.target);
            // vide la liste
            //this._containerItems.innerHTML="";
            // ferme la liste après un choix 
            closeListTagAfterChoice();
            // filtre les recettes en fonction du/des tag choisi
            var research = new ToResearch()
            /** Si aucunes recettes filtrées */
            if(sorted.length == 0){
                /** Lance la recherche avec les 50 recettes */
                sorted = research.toResearch(e, e.target, recipesSection, recipes, keywordObjectArray);
            }else{/** Sinon lance la recherche avec les recettes déjà filtrées */
                sorted = research.toResearch(e, e.target, recipesSection, sorted, keywordObjectArray);
            }
            // supprime le tag au clic dessus
            closeTag();
        };
    });
};
/** crée un bouton tag */
function createTag(elt){
    const div = document.getElementById('wrapper-tag-btn');
    const btnTag = document.createElement('button');
    const allStyle = getComputedStyle(elt.parentNode.parentElement);
    btnTag.classList.add('tag-btn','fs-5', 'm-2');
    btnTag.style.backgroundColor = allStyle.getPropertyValue("background-color");
    var text = elt.textContent;
    btnTag.setAttribute('id', text);
    btnTag.innerHTML = text + " <i class='fa-regular fa-circle-xmark'></i>";
    div.appendChild(btnTag);
};
/** 3: ferme la liste de tag si un tag est choisi */ 
function closeListTagAfterChoice(){
    const listSearch = Array.from(document.getElementsByClassName('container-search'));
    const btnSearch = Array.from(document.getElementsByClassName('button-search'));
    listSearch.forEach(btn=>{
        btn.style.display="none";
    });
    btnSearch.forEach(btn=>{
        btn.style.display="flex";
    });
}
/** ferme le tag au clic dessus */
function closeTag(){
    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('tag-btn')){
            var tag = e.target;
            tag.style.display='none';
            removeFilterOfTag(tag);
        };
    });
}
// Supprime le filtrage du tag supprimé
function removeFilterOfTag(tag){
    var recipeCards = Array.from(document.getElementsByClassName("card-recipe"));
    var input = tag.textContent.toLowerCase();
    for (let i = 0; i < recipeCards.length; i++) {
        if (recipeCards[i].hasAttribute("style") && !recipeCards[i].innerHTML.toLowerCase().includes(input)) {
            recipeCards[i].removeAttribute("style");
        }
    }
}
