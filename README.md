# LACIM Website

This is the repository for the code to generate the LACIM website.
It is built on [Jekyll](https://jekyllrb.com).

## Tricks & Tips

### Trigger a rebuild of the website without making any changes:

The website rebuilds after every commit/push. But to trigger a rebuild of the
website without making any changes, you can push an empty commit with the command:
```
git commit -m 'rebuild pages' --allow-empty
git push
```

## Documentation

 * [Configuring macOS for local website editing](_doc/website-development-on-macos.md)
 * [Configuring Ubuntu (22.04) for local website editing](_doc/website-development-on-ubuntu-22.04.md)
 * (TODO) Proposing changes to the website
