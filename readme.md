# Stream 1

Wir bauen ein kleines Twitch Chat Game. Dabei werden den Usern zufällige Magickarten zugewiesen und der User mit den höchsten CMC (Converted Mana Cost) gewinnt die Runde.

## Ablauf

- Runde wird gestartet
- User nehmen Teil, indem sie ein Command ausführen und bekommen eine zufällige Karte zugewiesen
- Am Ende der Runde gewinnt der User mit den höchsten CMC
- Bei Gleichstand erhalten alle User mit dem selben Ergebnis einen Punkt
- Wir merken uns die Teilnahmen und Punktzahlen der User (Highscore)

## APIs / Packages

- tmi.js => https://github.com/tmijs/tmi.js
- MTG API => https://docs.magicthegathering.io

## Todo

- [ ] Anbindung von tmi.js
- [ ] Implementierung der Commands
  - [ ] !mtg-fight-start (startet die Runde)
  - [ ] !mtg-fight-end (beendet die Runde)
  - [ ] Nur Ich darf die Runden starten und beenden
  - [ ] !mtg-fight (User nimmt an Runde teil)
- [ ] Anbindung von MTG Api Endpunkt (https://docs.magicthegathering.io/#api_v1cards_list)
- [ ] Abrufen von 100 zufälligen Karten
- [ ] Einem User eine zufällige Karte zuweisen, wenn dieser teilnimmt
- [ ] Auswerten, welcher User gewinnt
- [ ] Erzeugen einer Highscore (nur temporär)
