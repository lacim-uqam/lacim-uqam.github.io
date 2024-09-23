# Configuring Ubuntu (22.04) for local website editing

Reference: https://jekyllrb.com/docs/installation/ubuntu/

## Install Ruby

Uninstall the system version of Jekyll

    sudo apt remove jekyll
    sudo apt autoremove

Install Ruby and other prerequisites:

    sudo apt-get install ruby-full build-essential zlib1g-dev

Edit `~/.bashrc` to include the following lines,
which tells Ruby to install gems in `~/gems`:

    export GEM_HOME="$HOME/gems"
    export PATH="$HOME/gems/bin:$PATH"

## Install Jekyll

Install jekyll and bundler as gems

    gem install jekyll bundler

## Download the code and install dependencies

Clone the repository using `git clone [...]`.

Install the Ruby dependencies

    cd lacim-uqam.github.io
    bundle install

## Serving the website locally

    cd lacim-uqam.github.io
    bundle exec jekyll serve

Point your web browser to [http://localhost:4000](http://localhost:4000).
