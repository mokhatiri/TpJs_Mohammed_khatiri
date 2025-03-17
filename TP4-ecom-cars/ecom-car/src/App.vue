<template>
    <header>
        <img src="./assets/DALL-E-logo-cars.webp" alt="LOGO">
        <h1>Les Bonnes Pièces</h1>
    </header>
    <main>
        <!-- Menu de recherche -->
        <section class="filtres">
              <h3>Filtres</h3>
              <!-- search -->
              <div>
                  <label for="marque">nom:</label>
                  <input type="text" id="marque" v-model="keyword" placeholder="nom">
              </div>
  
              <!-- select -->
              <div>
              <fieldset>
                  <legend>Choisissez des catégories :</legend>
                  <label><input type="checkbox" name="categories" value="Électricité" v-model="categories"> Électricité</label><br>
                  <label><input type="checkbox" name="categories" value="Filtration" v-model="categories"> Filtration</label><br>
                  <label><input type="checkbox" name="categories" value="Moteur" v-model="categories"> Moteur</label><br>
                  <label><input type="checkbox" name="categories" value="Freinage" v-model="categories"> Freinage</label><br>
                  <label><input type="checkbox" name="categories" value="Refroidissement" v-model="categories"> Refroidissement</label><br>
                  <label><input type="checkbox" name="categories" value="Suspension" v-model="categories"> Suspension</label><br>
                  <label><input type="checkbox" name="categories" value="Sécurité" v-model="categories"> Sécurité</label><br>
                  <label><input type="checkbox" name="categories" value="Transmission" v-model="categories"> Transmission</label><br>
                  <label><input type="checkbox" name="categories" value="Carburant" v-model="categories"> Carburant</label><br>
                  <label><input type="checkbox" name="categories" value="Carrosserie" v-model="categories"> Carrosserie</label><br>
                  <label><input type="checkbox" name="categories" value="Échappement" v-model="categories"> Échappement</label><br>
                  <label><input type="checkbox" name="categories" value="Direction" v-model="categories"> Direction</label><br>
              </fieldset>
              </div>
              
              <!-- availability -->
              <label for="dispo">Disponibilité</label>
              <select name="dispo" id="dispo" v-model="available">
                  <option value="2">Toutes</option>
                  <option value="1">Disponible</option>
                  <option value="0">Rupture de stock</option>
              </select><br>
  
              <!-- price -->
              <label for="prix_min">Prix min:</label>
              <input type="number" id="prix_min" v-model="prix_min" placeholder="prix min"><br>
              <label for="prix_max">Prix max:</label>
              <input type="number" id="prix_max" v-model="prix_max" placeholder="Prix max">
          </section>
  
        <!-- Fiches produits -->
          <section class="fiches">
              <pieces_live :keyword="keyword" :categories="categories" :available="available" :prix_min="prix_min" :prix_max="prix_max"/>
          </section>
    </main>
  </template>
  <script setup>
      import { ref } from "vue";
      import pieces_live from './components/pieces_live.vue';
  
      // get the categories
      const available = ref(2);
      const keyword = ref("");
      const categories = ref([]);
  
      const prix_min = ref(0);
      const prix_max = ref(100000);
  
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  
    body {
        max-width: 1200px;
        margin: auto;
        padding: 16px;
        font-family: 'Montserrat', sans-serif;
    }
  
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;
        padding: 8px;
        background-color: #7451eb;
        text-align: center;
        color: white;
    }
    header img {
        height: 60px;
        margin-left: 1rem;
    }
    header h1 {
        flex-grow: 1;
    }
  
    main {
        display: flex;
        flex-direction: row;
    }
  
    .filtres {
        border-radius: 4px;
        box-shadow: 0px 0px 4px gray;
        margin: 8px;
        padding: 8px;
        min-width: 300px;
        min-height: 400px;
    }
    .filtres h3 {
        text-align: center;
    }
  
    .fiches {
        flex: 1;
        margin: 8px;
    }
    .fiches img {
        max-width: 200px;
    }
    .fiches p {
        margin-top: 4px;
        margin-bottom: 4px;
    }
  </style>