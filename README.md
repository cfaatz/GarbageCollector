# GarbageCollector
Modular bot for Computer Science servers

### Command List

All command names and aliases are case-insensitive. The permissions system is in development and as such **all commands can be used by anyone** for the time  being.

Command Name | Command Aliases | Command Description | Command Usage
------------ | --------------- | ------------------- | -------------
dice | roll, r, diceroll, dr | roll dice pseudo-randomly | !roll 3d6 2d12
exec | execute, run | execute JavaScript code in a secure sandbox | !exec \`\`\`console.log("Hello, world!");\`\`\`
health | status, bothealth, botstatus, h, stat, stats | get statistics on bot health such as CPU, mem util, latency, etc | !health
load | l, enable, loadcommand, lc | load command module from bot's command folder by command name or alias | !load health
meat | meat, m2u, m2usd | retrieve live data of exchange rate between USD, Mr. Accessory, and Meat, from Kingdom of Loathing | !meat
reload | r | reload (unload then load) command from bot's loaded command list by name or alias | !reload health
unload | ul, disable, unloadcommand, uc | unload command module from bot's loaded command list by name or alias | !unload health
wiki | wikipedia, wikisearch | search for a wikipedia article and retrieve its link, title, and part of its description | !wiki Beatty sequence
