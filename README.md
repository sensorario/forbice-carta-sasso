# Forbice Carta Sasso

## Installazione

```
npm i
```

## Gioco

```
npm run server
```

## Funzionamento

Affinche possa iniziare una partita, si deve creare una "stanza" nella quale possono entrare due e solo due giocatori.

 - quando un client dispari entra, si crea una stanza
 - quando un client parti entra, accede a quella stanza

Una volta creata la stanza i giocatori possono fare la propria mossa

 - appariranno cosi tre bottoni (forbice, carta, sasso)
 - quando il primo giocatore fa la sua mossa, spariscono i bottoni
 - chi ha gia giocato, ... rimane in attesa della mossa del suo avversario
 - quando entrambi hanno gioicato il turno si conclude
 - il gioco contonua fino allo scadere del tempo

Il gioco ha una durata arbitraria di 30 secondi (configurabili)

 - dopo 30 secondi il server si ferma e mostra la sessione del vincitore

