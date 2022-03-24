class BinarySearch{
    // recupere id du mot correspondant le + au mot recherché
      binarySearch(array, searchedKeyword){
        /** initialise un debut et une fin */
        var First = 0
        var Last = array.length - 1;
        /** Tant que index de debut est inf ou = à index de fin*/
        while (First <= Last) {
          /** init d'un milieu */
          var Middle = Math.floor((First+Last)/2)
          /**
           * Middle = milieu tab soit 342
           * array[Middle].keyword = mot du milieu soit au depart le mot "l'epaisseur"
           * searchedKeyword = mot recherché
           * array[Middle].keyword > searchedKeyword = mot milieu se situe après mot recherché
           * array[Middle].keyword < searchedKeyword = mot milieu se situe avant mot recherché
           */
          /** si le mot du milieu du tab inclus le mot recherché */
          if (array[Middle].keyword.toLowerCase().includes(searchedKeyword.toLowerCase())) {
            //renvoi l'index du milieu à la fonction suivante
            return Middle
          //sinon si le mot du milieu est situé après le mot recherché
          } else if (array[Middle].keyword > searchedKeyword) {
            //alors la fin du tableau sera = à index du mot milieu retenu -1
            //la recherche se fera à gauche du tab restant
            Last = Middle - 1
          //sinon si le mot du milieu est situé avant le mot recherché
          } else if(array[Middle].keyword < searchedKeyword){
            //alors le debut du tableau sera = à index du mot milieu retenu +1
            //la recherche se fera à droite du tab restant
            First = Middle + 1
          }
        }
      }
      // Vérification du mot correspondant à l'id retenu et recup les autres mots aux alentours
      binarySearchMultiple(array, searchedKeyword){
        //id du mot trouvé, recupéré ds la fonction du haut
          var firstMatchId = this.binarySearch(array, searchedKeyword);
          var resultArr = [-1, -1];
          //si index retenu est inconnu 
          if (firstMatchId == -1) {
              return resultArr;
          }
          // le + à gauche et le + à droite
          var leftMost = firstMatchId;
          var rightMost = firstMatchId;
          // si index du mot trouvé est sup ou = à 0
          if (firstMatchId >= 0) {
            //tant qu'index mot trouvé est sup à 0 et tant que le mot précédent celui-ci contient le mot recherché  
            while (leftMost > 0 && array[leftMost-1].keyword.includes(searchedKeyword)) {
              //renvoi l'id du mot précédent
              leftMost--;
            }
            //tant qu'index mot trouvé est inf à la longueur du tab -1 et que le mot suivant contient le mot recherché
            while (rightMost < array.length-1 && array[rightMost+1].keyword.includes(searchedKeyword)) {
              //renvoi l'id du mot suivant
              rightMost++;
            }
          }
          //1er elt de resultat = index du mot retenu le plus à gauche (resultat du 1er while au dessus)
          resultArr[0] = leftMost;// ex: 1er tour on aura 115(id de citron)
          //2nd elt de resultat = index du mot retenu le plus à droite(resultat du 2eme while au dessus)
          resultArr[1] = rightMost;//ex: 1er tr on obtiendra 117 car id initialemt retenu 116+1
  
          var allSelectedsearchedKeyword = [];
          // boucle sur interval de index mot trouvé le+ à gch et index mot trouvé le+ à droite
          // ex: 115 -> 117
          for (var i=resultArr[0]; i<=resultArr[1]; i++) {
            // retient index de ces mots dans le tableau
            allSelectedsearchedKeyword.push(i);
          }
          var selectedIds = [];
          //boucle sur ce tableau d'index des mots trouvé
          allSelectedsearchedKeyword.forEach(searchedKeyword => {
            // retient ts les ids recette de chq mots
            selectedIds.push(array[searchedKeyword].ids);
          });
          // tableau qui va acceuillir les ids de chq recette où le mot recherché se trouve 
          return [...new Set(selectedIds.flat())];
      }
  }
  
  
  