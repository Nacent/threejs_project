Room 3D Threejs

Installation

1-Avoir ou installer Node.js.
2-Installer la bibliothèque Three.js en ouvrant le terminal et en utilisant la commande "npm install three" (Attention, la commande peut être différente selon le système utilisé. En cas de problème d'installation, essayez avec l'écriture suivante : "npm install three" ou "yarn add three").
3-Lancer la commande "npm run dev" pour démarrer le serveur local et voir les modifications.

Détail

- Le modèle 3D est stocké dans le dossier "public" au format .glb avec le format .blend si des modifications sont à faire sur Blender.
- Pour éviter les répétitions et simplifier le code, le projet est séparé en plusieurs fichiers :
    main.js : contient les éléments essentiels (scène, caméra, ombre et lumière, modèle 3D, etc.).
    camera.js : contient les paramètres de déplacement de la caméra.
    modelLoader.js : contient les paramètres du modèle 3D.
    animation.js : permet à la caméra d'avoir des déplacements et une animation fluide."