<template>

    <div class="page-container">
      <h2> Votre profil</h2>
      <h3>{{ username }}</h3>
      <table>
        <thead>
          <tr>
            <th>Partie</th>
            <th>Nom</th>
            <th>Points</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Partie 1</td>
            <td>Nancy</td>
            <td>5230pts</td>
            <td>rejouer cette partie</td>
          </tr>
          <tr>
            <td>Partie 2</td>
            <td>Paris</td>
            <td>7200pts</td>
            <td>rejouer cette partie</td>
          </tr>
        </tbody>
     </table>
    
    </div>
    <routerLink to="/" type="submit">Se déconnecter</routerLink>
    </template>
    
    <script setup>
    import localStorage from '@/plugins/localStorage';

    let username =  localStorage.sav()
     
    </script>
    
    <style>
         table {
          width: 80%;
          border-collapse: collapse;
          margin: 20px auto;
          background-color: #28293E;
        }
    
        th, td {
          border: 1px solid #717394;
          padding: 10px;
          text-align: center;
          color: #42B480;
        }
    
    </style>