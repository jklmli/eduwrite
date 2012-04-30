# What is this?
Eduwrite is a collaborative note-taking platform built on top of [etherpad-lite](https://github.com/pita/etherpad-lite),
while maintaining privacy and instructor controls similar to those found in [Piazza](https://piazza.com/).

# Installing
## Linux

### Dependencies

gzip, git, curl, libssl develop libraries, python and gcc

Some distro-specific commands to help you along:

- *Debian/Ubuntu*: `sudo apt-get install gzip git-core curl python libssl-dev build-essential mysql-client mysql-server`
- *Fedora/CentOS*: `sudo yum install gzip git-core curl python openssl-devel mysql mysql-server && yum groupinstall "Development Tools"`

1.  Install the (additional?) dependencies with `bin/installDeps.sh` (an unfortunate dinosaur from etherpad-lite).
2.  Run `make build`.
3.  Start it with `make run`.
4.  Open your web browser and visit [http://localhost:9001](http://localhost:9001).

# License
The [MIT License](http://www.opensource.org/licenses/mit-license.php) has been included for any new code written for Eduwrite.  
The original etherpad-lite code is licensed under the [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

# Development

## EduWrite project structure
You can modify the settings in the file `settings.json`
EduWrite code can be found under `node`

- `node/views` contains Jade templates for UI
- `node/static` contains static files for EduWrite UI (bootstrap & basic styling)
- `node/model` handles database interaction
- `node/facade` contains the facades (live -- touches the database, and mock -- returns static data)

## Documentation
You'll need [pygments](http://pygments.org/), a syntax highlighter.  
Run `make docs`, and some HTML files will show up under `docs/`, courtesy of [docco-husky](https://github.com/mbrevoort/docco-husky).

If you have [wkhtmltopdf](http://code.google.com/p/wkhtmltopdf/) installed, a PDF is built that combines all these HTML files.

## Miscellaneous
You can run `bin/run.sh 9001 mock` if you prefer not to deal with a database while testing.
