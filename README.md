# SwordWeirdoCharGenerator
Generate your unique Sword Weirdos warband with this fun and easy-to-use generator! Customize your squad's members, weapons, and special traits to create a quirky and powerful team ready for battle. Use the playground listed below to build your warband and use it in battle!

> [!WARNING] 
> This tool is still in Alpha Version (below 1.0.0)!! This means there are still some bugs and stuff is not as pretty as it can be. There should be a list below, which lists the not working features yet (bugs are not included). I would welcome your help and write down bug reports to improge this application

## ❗️ Important Links

- 📄 [Docs](https://github.com/CapRat/SwordWeirdoCharBuilder/wiki)
- 🚨 [Issues](https://github.com/CapRat/SwordWeirdoCharBuilder/issues)
- 🏬 [Buy the Game](https://www.wargamevault.com/product/437324/Sword-Weirdos?term=sword+wei)
- 🎮 [Hosted](https://caprat.github.io/SwordWeirdoCharBuilder/)

## ✨ Features
- dynamic Warband generaton
- supports a wide range of different classes weapons and so on (only 2-3 make problems currently)
- primitive Print support(its not the most beautiful print in the world, but it lets you start in the game)
- Support for complete new Rulesets or modification of current one. (Add your own classes and other stoff easy per json) 

## Future Development
Currently there is a lot to do in this Project, i know. But since it currently has not so much usage. So if you want more, submit bugs or contact me for new features. I currently have some kind of plan what i will do in the Future but since i do it in my freetime i cant assure you, when its done. The Milestones currently are not in any order and might also be done parrallele.

### Milestones
    - Improve overall stability (specially when removing classes like caster, which currently leads to a lot of problems)
    - try to reconfigure the way errors are handled (on some wrong configurations just show an error, and on some dont allow it. But this takes a lot of time to make it good for userexperience)
    - Create Documentation in general and specially in how to handle the Ruleset, since you can do a lot with it (for example turn the Game completly upside down with new classes and everything)
    - Improve printing dialogue
    
## 💿 Install

To setup this project install npm and then run a dev server locally:
```console
npm install
npm run dev
```

If you desire it you can also build it with `npm run build`. This creates an dist directory, which can be used by any webserver you want (But you cant click the index.html and run it in your local Browser.)
If you want to serve the dist folder you can also run it for example with python webserver in your commandline.
```console
cd swordWeirdoDistFolder
python3 -m http.server 8080
```



## 📑 License
[MIT](http://opensource.org/licenses/MIT)
but all creative content in the rulebook belongs to the original author.
