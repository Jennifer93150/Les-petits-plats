class LinearSearch{
    /** Recherche séquentielle (ligne par ligne) */
      linearSearch(array, searchedKeyword){
        var arraySorted = [];
        /** Pr chq elt du tab */
        array.forEach((element, index)=>{
          /** verif si le mot clé courant correspond au mot recherché */
          if(element.keyword.toLowerCase().includes(searchedKeyword.toLowerCase())){
            /** si oui retient ses ids recettes */
            arraySorted.push(array[index].ids);
          }
        });
        return [...new Set(arraySorted.flat())];
      }
  }
  