# 2024-04-23 14:32

I've recently started keeping a devlog for my personal projects. I've found it to be an easy way to keep track of my thoughts, and... well, to be honest, sometimes it helps to have a place to braindump whatever's on my mind. Recently, I got a new dev machine and, truth be told, I've been itching to finish a XR project. Any project. Most of the things I've been doing for the past year or so are all client-related and not a fun little project of my own. I'd started working on GalconXR somewhere last year, been on a bit of a break. After skimping through the code, there's more progress than I remembered, so I'm hoping that this could be the 'quick win' I am looking for.

So what is it? Basically, it's a clone of a game called [GalCon](https://www.galcon.com/) which is an arcadey strategy game. You have a single planet, your enemies have a single planet, and you have to send out your armies to take over other planets. Sessions are generally short, and I often find myself playing a few to pass the time. I've been wanting to rebuild this in WebXR and this would be my current attempt.

(I do have to give the game a different name. I asked Phil Hassey about this, and he kindly asked if I could just release it under a different one)

One key thing I tried here was to build the entire game first into Storybook before settling on any final code. And as said, I'm farther than I expected. There's currently a GameSession component which lets you set the size of a galaxy and the players in it, and it just instantly works. To get into this, I just finished up cleaning up the code to set a modifier for the deltaTime which allows me to let the player to enter a slow-motion mode to gather their thoughts.

So just for myself, I'd like to add a little todo list here(in no specific order), so that I know what I need to focus on next:

- [ ] Add an AIPlayer variant that does more than make random moves
- [ ] Improve the graphics for the planets
- [ ] Randomize army strength for neutral planets
- [ ] Add dialog boxes when a player has won
- [ ] Setup a proper VR environment
- [ ] Test-test-test! Play-play-play!
- [ ] Setup Github Actions to instantly deploy whenever the main branch is updated