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

- [x] Anbindung von tmi.js
- [x] Implementierung der Commands
  - [x] !mtg-fight-start (startet die Runde)
  - [x] !mtg-fight-end (beendet die Runde)
  - [x] Nur Ich und Mods dürfen die Runden starten und beenden
  - [x] !mtg-fight (User nimmt an Runde teil)
- [x] Anbindung von MTG Api Endpunkt (https://docs.magicthegathering.io/#api_v1cards_list)
- [x] Abrufen von 100 zufälligen Karten
- [x] Einem User eine zufällige Karte zuweisen, wenn dieser teilnimmt
- [x] Auswerten, welcher User gewinnt

- [x] Teilnehmer anzeigen (bevor Kampf abgeschlossen wird)
- [ ] Erzeugen einer Highscore (nur temporär)
- [ ] Design etwas verbessern
- [ ] Code aufräumen
- [ ] Auf surge.sh deployen
