
# An unnecessary journaling tool

A book with actual pages of paper works well cos it is separate to my laptop

But where's the fun in that

I want to learn some stuff by building towards a goal

I've made a little of what I want with some typescript React rendered to HTML but it's already getting clunky

I'm pretty much building Confluence :/

# Prerequisites

* `brew install terraform`
* `npm install -g yarn`
* `curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"`
* `sudo installer -pkg AWSCLIV2.pkg -target /`
* `rm AWSCLIV2.pkg`
* `aws configure`

# TODO

## behaviour

 - [ ] entry list slug should update as journal entry is changed
 - [ ] entry list slug should allow journal entry date change
 - [ ] journal entry should render markdown titles
 - [ ] journal entry should render markdown bold and italic
 - [ ] journal entry should render markdown web links (and open them in a new tab)
 - [ ] journal entry should render markdown image links
 - [ ] journal entry should render markdown tables
 - [ ] journal entry should allow inline image placement and editing
 - [ ] some prettiness for UI
 - [ ] to do list in the app
 - [ ] tagging for to-dos
 - [ ] tagging for entries
 - [ ] linking between todos and journal (single links)
 - [ ] linking between todos and journal (multi links)
 
## system

 - [ ] deploy to AWS
 - [ ] cognito login
 - [ ] caching with cloudfront
 - [ ] WAF to protect against someone stealing secret journal thoughts
 