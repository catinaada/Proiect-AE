Proiect AE - Instrucțiuni de Configurare
Cerințe Prealabile
Asigură-te că Node.js este instalat pe mașina ta locală.

Configurare și Rulare a Aplicației
1. Clonează Repository-ul
Clonează proiectul din repository-ul GitHub și deschide-l într-un editor de cod, cum ar fi Visual Studio Code.

git clone https://github.com/catinaada/Proiect-AE.git
cd Proiect-AE

2. Instalează Dependențele
Navighează în directorul backend din terminal.
Adaugă un fișier .env în directorul backend cu detaliile din .env.example.
Instalează dependențele necesare pentru backend:
cd backend
npm install

Navighează în directorul frontend și instalează dependențele necesare pentru frontend:
cd ../frontend
npm install

3. Pornește Serverul Backend
Navighează înapoi în directorul backend:
cd ../backend
Pornește serverul backend:
npm run start

Dacă serverul pornește corect, terminalul va afișa log-uri care confirmă inițializarea serverului și sincronizarea bazei de date.

4. Pornește Aplicația Frontend
Navighează în directorul frontend:
cd ../frontend
Pornește aplicația frontend:
npm run dev

Aplicația va fi disponibilă în browser la adresa http://localhost:5173.
La accesarea aplicației, primul ecran afișat va fi pagina de Login. Utilizatorii pot comuta la pagina de Creare cont din interfață.

