# Configuring macOS for local website editing

Reference: https://jekyllrb.com/docs/installation/macos/

## Install Ruby

Install chruby and ruby-install with Homebrew:

    brew update
    brew upgrade
    brew install chruby ruby-install xz
    ruby-install ruby 3.3.4

> To find the correct ruby version so use, check
> https://pages.github.com/versions.json,
> but this information should be in the `~/.ruby-version` file.

Configure bash to automatically use chruby: add the following lines to
`.bash_profile`:

    source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh
    source $(brew --prefix)/opt/chruby/share/chruby/auto.sh
    chruby ruby-3.3.4

Test: launch a new terminal and run `ruby -v`; it should show 3.3.4.

## Install Jekyll

    gem install jekyll

## Download the code and install dependencies

Clone the repository using `git clone [...]`.

Install the Ruby dependencies

    cd lacim-uqam.github.io
    bundle install

## Serving the website locally

    cd lacim-uqam.github.io
    bundle exec jekyll serve

Point your web browser to [http://localhost:4000](http://localhost:4000).
