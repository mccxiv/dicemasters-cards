# Marvel Dice Masters™ cards.

### <a href="http://dicemasters.mccxiv.me" target="_blank">dicemasters.mccxiv.me</a>

#### What is it?
A convenient way to display multiple cards on screen.  
Not meant for deck building, there are better resources for that. 

#### Use cases
- A friend and I want to play Dice Masters remotely via webcam.
I don't own all the cards; It would be convenient to have all of the opponent's on a monitor, at a glance.
Especially true for beginners that don't have them memorized.


- I want to share an arbitrary set of cards with someone else, through a single link

#### Features and status
- [x] Search for cards
- [x] Save individual cards so that a new search won't clear them
- [ ] Ability to share a set of saved cards via url

##### Project info
- node.js server, cards fetched using [this scraper](https://github.com/mccxiv/dm-lookup)
- angular front end with some limited use of [angular material design](https://github.com/angular/material) elements
- socket.io for data

##### Demo & live site: <a href="http://dicemasters.mccxiv.me" target="_blank">dicemasters.mccxiv.me</a>