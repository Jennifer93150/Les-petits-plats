/** PAS UTILISE PR LE MOMENT */
class Autocompletion{ 
    autocomplete(input, array, minLength) {
        /*la fonction de saisie semi-automatique prend 2 argts,
        l'élt de chp de txt et un tab de valeurs possibles en saisie semi-automatique*/
        var currentFocus;
        input.addEventListener("input", function(e){
            if (input.value.length > minLength){
                var val = this.value;// valeur tapée
                /*ferme tts listes déjà ouvertes de valeurs complétées automatiqmt*/
                closeAllLists();
                if (!val) { return false;}
                currentFocus = -1;
            //creer un element qui contiendra les suggestions
                var div = document.createElement("div");
                div.setAttribute("id", this.id + "-autocomplete-list");
                div.setAttribute("class", "autocomplete-items");
                /*ajoute l'élément DIV en tant qu'enfant du conteneur de saisie semi-automatique :*/
                this.parentNode.appendChild(div);
                /*pr chq élt du tab...*/
                for (var i = 0; i < array.length; i++) {
                /*vérifie si l'élt du tab commence par les mm lettres que la valeur du chp de txt :*/
                    if (array[i].substring(0, val.length).toUpperCase() == val.toUpperCase()) {//substr(nbr ltre a supp, nbr de ltrs à garder qui suivent celle supp)
                        /* créer un élt pour chq élt correspondant :*/
                        var b = document.createElement("p");
                        /*met les lettres correspondantes en gras :*/
                        b.innerHTML = "<strong>" + array[i].substr(0, val.length) + "</strong>";/** ajoute juste les lettres non tapées de l'elmt si je tape 'th'(val.length) ca donne => -on Rouge, -on en miettes..(arr[i]) */
                        b.innerHTML += array[i].substr(val.length);
                        /*insérer un champ d'entrée qui contiendra la valeur de l'élément de tableau actuel :*/
                        b.innerHTML += "<input type='hidden' value='" + array[i] + "'>";
                            b.addEventListener("click", function(e) {
                            /*insérer la valeur du champ de texte de saisie semi-automatique :*/
                            input.value = this.getElementsByTagName("input")[0].value;
                            /*ferme la liste des valeurs complétées automatiquement,
                        (ou toute autre liste ouverte de valeurs complétées automatiquement :*/
                            closeAllLists(div);
                        });
                        div.appendChild(b);
                    }
                }
            }
        });
        
        /*exécute une fonction dès l'appuie sur une touche du clavier :*/
        input.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "-autocomplete-list");
            if (x) x = x.getElementsByTagName("p");
            if (e.keyCode == 40) {
                /*Si la touche fléchée vers le BAS est enfoncée,
                augmenter la variable currentFocus :*/
                currentFocus++;
                /*et rend l'élément courant plus visible :*/
                addActive(x);
            } else if (e.keyCode == 38) { //en haut
                /*Si la touche fléchée HAUT est enfoncée,
                diminuer la variable currentFocus :*/
                currentFocus--;
                /*et rend l'élément courant plus visible :*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*Si la touche ENTER est enfoncée, empêche la soumission du formulaire*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /** currentFocus ici sera 0
                     * x = HTMLCollection(nbr de p) [les <p> dispo dont 1 avec la classe autocomplete-active]
                     * x[currentFocus] = <p class="autocomplete-active"></p>
                     */
                    /*et simuler un clic sur l'item "actif", l'elt sera selectionné */
                    if (x) x[currentFocus].click();
                }
            }
        });
        /** fonction ajout classe active */
        function addActive(x) {
            /*une fonction pour classer un élément comme "actif":*/
            if (!x) return false;
            /*commencer par supprimer la classe "active" sur tous les éléments :*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /* ajoute class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        /** supp la classe active */
        function removeActive(x) {
        /*une fonction pour supprimer la classe "active" de tous les éléments de saisie semi-automatique :*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {//elmnt = à l'input
            /*ferme toutes les listes de saisie semi-automatique dans le document,sauf celui passé en argument :*/
            var x = Array.from(document.getElementsByClassName("autocomplete-items"));
            for (var i = 0; i < x.length; i++) {
                //x[i] = div des elmts correspondant
                if (elmnt != x[i] && elmnt != input) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*ferme liste autocompletion qd qlqun clique ds le doc :*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
}