## What Is This?

This project uses [Markov Chains](https://en.wikipedia.org/wiki/Markov_chain) to generate a presumably infinite amount of content that might have been included in [Marcus Fabius Quintilianus](https://en.wikipedia.org/wiki/Quintilian)'s *magnum opus*, the 12-volume *Institutes of Oratory*. A colleague casually observed to me that it seemed that everyone in rhetoric at some point or another comes around to talking about Quintilian and that they were tired of reading about Q. This conversation planted the idea of being able to generate *even more* Quintilian than the *Institutio*. Hence, this bot.

## How Was This Made?

The sentences are generated using [RiTa](http://www.rednoise.org/rita/)'s Markov Chain support. It is being fed with [a copy of Quintilian's *Institutes of Oratory* from the Perseus Project](http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a2007.01.0060%3abook%3d1) that I stripped of XML for a different project.

The [source code for the entire project](https://github.com/oncomouse/homework-copia) is available on GitHub, if you want to take a look.