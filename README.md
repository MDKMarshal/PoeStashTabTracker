# PoeStashTabTracker
Tracker for non-public Path of Exile stash tabs. Currently an experiment in aquiring stash tab data. Really not suitable for public usage right now, but here we are.

# Requirements
  * nodejs
  * grunt-cli
  * a web browser
  * Path of Exile account & session ID

# How do I get a sesison Id?
I'm not telling you. No, really. If I were malicious, I could theoretically accounts with session ID's. So, if you can figure out how to get a sesison ID, I reckon you should be able to inspect this code to confirm that I'm not going to steal your login details or do anything nefarious. With any luck, if you get this running you should be satisfied that I'm personally never seeing your session ID or any private information.

Seriously, it's pretty easy to get a session ID. Go play with some of the other PoE item pricing web tools and you should figure it out eventually.

# Get it running
  * download & cd to directory
  * npm-install in website and server directories
  * grunt copy-website to generate libs folder in website
  * cd server
  * node server.js
  * browser to localhost:3000

# Getting items from tabs
  * Enter your account name and as session ID from a PoE stash tab request
  * Select a tab from the list that appears
  * Toggle on tracking
  * ???
  * Enjoy list of items in that tab

# Auto-pricing items in a tab
Coming soon, that's the end goal of this prohject

# I want a feature / pull requests / etc
Active development by one guy in his spare time. This is public on GitHub because I'm cheap and I want to share with friends. By all means ask away, but don't expect anything at a reasonable pace!
