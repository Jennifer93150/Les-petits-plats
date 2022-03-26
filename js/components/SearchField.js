class SearchField{
    constructor(remainingItem, containerItems, classLi, btnSearchCurrent, 
        fieldSearchCurrent, btnSearch2, btnSearch3, list2, list3, inputCurrent) {
        this._remainingItem = remainingItem;
        this._containerItems= containerItems;
        this._classLi = classLi;
        this._btnSearchCurrent = btnSearchCurrent;
        this._fieldSearchCurrent = fieldSearchCurrent;
        this._btnSearch2 = btnSearch2;
        this._btnSearch3 = btnSearch3;
        this._list2 = list2;
        this._list3 = list3;
        this._inputCurrent = inputCurrent;
    }
    searchFieldDisplay(){
        // Au clic sur le bouton ingredient ou appareils ou ustensils
        this._btnSearchCurrent.addEventListener('click', ()=>{
            // ferme la liste ouverte si clic sur chevron 
            this.closeFieldSearchCurrent();
            //et les autres listes si ouvertes
            this.closeOthersFieldSearch();
            // ouvre la liste
            this.openList();
            // vide la liste
            this.emptyList(this._containerItems);
            // crée une liste de tag actualisé en fonction des recettes restantes
            this.createListOfTagRemaining(this._remainingItem, this._containerItems, this._classLi);
            // recup ts elts de la class item-ing, item-app, item-ust
            const allItemsSearchField = Array.from(document.getElementsByClassName(this._classLi));
            // Supprime les elts de la liste de tag qui ne correspondent pas à la saisie
            this.removeItemTagList(this._inputCurrent, allItemsSearchField);
        });
    }
    /** 2: actualise la liste avec recettes présentes sur la page */
    createListOfTagRemaining(remainingItem, containerItems, classLi){
        //recup elts html ing, app ou ust de chq recette actuellement sur la page
        var remainingItems = Array.from(document.querySelectorAll(remainingItem));
        // recup le texte de chq elt
        var remainingItemsArr = [];
        remainingItems.forEach(item => {
            remainingItemsArr.push(item.textContent);
        });
        // supp les doublons et range par ordre alpha
        var items = [...new Set(remainingItemsArr)];
        // crée la liste de mots clés actualisée
        this.addItem(items, containerItems, classLi);
    }
    /** 3: création elt de la liste ing, app, ust actualisés */
    addItem(array, parentElt, classLi){
        array.forEach(item => {
            const li =  document.createElement('li');
            li.classList.add('list-item', classLi);
            // Je mets la 1ere lettre de chq mot en maj 
            li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
            parentElt.appendChild(li);
        });
    }
    // 4: vide la liste (cela sert à l'actualiser par la suite ac les ing, app ou ust restants)
    emptyList(containerItems){
        containerItems.textContent="";
    }
    // 5: ouvre la liste de mots clés
    openList(){
        this._btnSearchCurrent.style.display='none'; 
        this._fieldSearchCurrent.style.display='block';
    }
    /** 6: ferme champs recherche et liste et affiche bouton */
    closeList(){
        this._fieldSearchCurrent.style.display='none';
        this._btnSearchCurrent.style.display='flex'; 
    }
    /** 7: ferme liste au clic sur chevron ou input princ */
    closeFieldSearchCurrent(){
        document.addEventListener("click", function(e){
            if (e.target.matches(".input-search-tag")) {
                /** stop l'event de fermeture au clic sur input */
                e.stopPropagation();
                e.preventDefault();
            }else if(e.target.matches(".fa-chevron-down")){
                /** simule un clic sur le button (le parent du chevron) */
                e.target.parentElement.click();
            }else if (!e.target.matches(".btn-search")) {
                const buttonSearch = Array.from(document.getElementsByClassName("btn-search"));
                const containerSearch = Array.from(document.getElementsByClassName("container-search"));
                buttonSearch.forEach(btn => {
                    btn.removeAttribute("style")
                });
                containerSearch.forEach(tagField => {
                    tagField.style.display="none"
                });  
            }
        });
    }
    /** 8: réaffiche la liste de mots clés entière si fermée après que user ait choisi un mot  */
    reinitFieldSearch(){
        //const items = Array.from(document.getElementsByClassName(this._classLi));
        this._inputCurrent.value = "";
        // items.forEach(item =>{
        //     item.style.display="block";
        // });
    }
    /** 9: ferme autres listes si ouvertes */
    closeOthersFieldSearch(){
        if(this._list2 || this._list3){
            this._list2.style.display='none';
            this._btnSearch2.style.display='flex';
            this._list3.style.display='none';
            this._btnSearch3.style.display='flex';
        }
    }
    /** 10: masque mots clés de la liste des champs qui ne correspondent pas à la saisie 
     * paramètres: elt a écouter & liste de mots clés
    */
    removeItemTagList(input, allItemsSearchField){
        input.addEventListener("input", function(e) {
            for (let i=0; i<allItemsSearchField.length; i++) {
                console.log(allItemsSearchField[i])
                /** si elt courant de la liste contient le mot saisi */
                if (allItemsSearchField[i].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                    /** alors affiche le */
                    allItemsSearchField[i].removeAttribute("style");
                } else {/** sinon masque le */
                    allItemsSearchField[i].style.display = "none";
                }
            }
        });
    }
    /** si les ing, app ou ust des recettes ne contiennent pas elt courant de la liste alors masque le 
     * 
    */
    removeItemTagList2(remainingItem, allItemsSearchField){
        /** 1 recuperer les ingredients, app ou ust de chq recettes */
        //recup elts html ing, app ou ust de chq recette actuellement sur la page
        var remainingItems = Array.from(document.querySelectorAll(remainingItem));
        // recup le texte de chq elt
        var remainingItemsArr = [];
        remainingItems.forEach(eltRecipe => {
            remainingItemsArr.push(eltRecipe.textContent);
        });
        // supp les doublons et range par ordre alpha
        var eltRecipes = [...new Set(remainingItemsArr)];
        /** 2 recup elt courant de la liste = allItemsSearchField */
        
            for (let j=0; j < allItemsSearchField.length; j++) {
                console.log(allItemsSearchField[j].innerHTML)
                new LinearSearch().linearSearch2(eltRecipes, allItemsSearchField[j].innerHTML);
                // if (eltRecipes[i].toLowerCase().includes(allItemsSearchField[j].innerHTML)) {
                //     allItemsSearchField[j].removeAttribute("style");
                    
                // } else {
                //     allItemsSearchField[j].style.display = "none";
                // }
            }
        
            
       
    }
}

