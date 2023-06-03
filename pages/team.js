import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TeamPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Charger le SDK Firebase via une CDN
    const firebaseScript = document.createElement('script');
    firebaseScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js';
    firebaseScript.onload = () => {
      const databaseScript = document.createElement('script');
      databaseScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js';
      databaseScript.onload = initializeFirebase;
      document.head.appendChild(databaseScript);
    };
    document.head.appendChild(firebaseScript);
  }, []);

  const initializeFirebase = () => {
    // Initialiser Firebase avec vos informations de configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBcWPwQu2a1Kgx6LSg3e2s4yvzLKfSB0Jw",
  authDomain: "theboringcube-f508a.firebaseapp.com",
  databaseURL: "https://theboringcube-f508a-default-rtdb.firebaseio.com",
  projectId: "theboringcube-f508a",
  storageBucket: "theboringcube-f508a.appspot.com",
  messagingSenderId: "1022151595258",
  appId: "1:1022151595258:web:75f874855c2a887fb32543",
  measurementId: "G-YYN18C1SR5"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  useEffect(() => {
    // Vérifier l'état de connexion via Web3
    const checkConnection = async () => {
      try {
        // Vérifier si Web3 est disponible dans le navigateur
        if (typeof window.ethereum !== 'undefined') {
          // Demander à l'utilisateur de se connecter à son wallet Ethereum
          await window.ethereum.enable();
          // Créer une instance de Web3 avec le fournisseur Ethereum
          const web3 = new Web3(window.ethereum);
          // Vérifier si l'utilisateur est connecté à son wallet Ethereum
          const accounts = await web3.eth.getAccounts();
          setIsConnected(accounts.length > 0);
          setSelectedAddress(accounts[0] || '');
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkConnection();
  }, []);

  const confirmTeamSelection = (teamName) => {
    if (isConnected && selectedAddress) {
      const confirmation = window.confirm('Voulez-vous rejoindre cette équipe ?');

      if (confirmation) {
        // Enregistrer le choix de l'utilisateur dans la base de données Firebase
        const userAddress = selectedAddress; // Adresse ETH de l'utilisateur

        if (firebase.apps.length) {
          const database = firebase.database();
          database.ref('users/' + userAddress).set({
            team: teamName
          })
            .then(() => {
              console.log('Choix de l\'équipe enregistré dans la base de données Firebase');
            })
            .catch((error) => {
              console.error('Erreur lors de l\'enregistrement du choix de l\'équipe dans la base de données Firebase', error);
            });
        }
      }
    } else {
      // L'utilisateur n'est pas connecté, rediriger vers la page d'accueil
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Team Selection Page</h1>
      <div id="team-selection-container">
        <div className="team-container" id="frogz-container">
          <div className="team-title">The Frogz Team</div>
          <img src="https://cdn.discordapp.com/attachments/1090010869343195188/1114087970090266654/SamPlayer20_a_3D_cube_with_Pepee_the_frog_on_each_surface_of_th_946758" alt="Frogz" className="team-image" id="frogz-image" />
          <br />
          <button className="team-button" onClick={() => confirmTeamSelection('Frogz')}>Join the team</button>
        </div>
        <div className="team-container" id="monkz-container">
          <div className="team-title">The Monkz Team</div>
          <img src="https://cdn.discordapp.com/attachments/1090010869343195188/1113799982785499377/SamPlayer20_a_3D_cube_with_a_Bored_Ape_on_eatch_surface_of_the__76f515cf-6fc6-47e2-9a19-0b6e33bc8f16" alt="Monkz" className="team-image" id="monkz-image" />
          <br />
          <button className="team-button" onClick={() => confirmTeamSelection('Monkz')}>Join the team</button>
        </div>
        <div className="team-container" id="shibz-container">
          <div className="team-title">The Shibz Team</div>
          <img src="https://cdn.discordapp.com/attachments/1090010869343195188/1114087621426151434/SamPlayer20_a_3D_cube_with_a_cartoon_Shiba_on_each_surface_of_t_bda40775-fb8c-40fd-b5f1-e7b808a3b6b8" alt="Shibz" className="team-image" id="shibz-image" />
          <br />
          <button className="team-button" onClick={() => confirmTeamSelection('Shibz')}>Join the team</button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
