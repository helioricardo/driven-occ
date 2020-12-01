# driven-occ
 CLI to manage OCC development at Driven.cx

## How does it work?
### Install
```sh
npm i helioricardo/driven-occ
npx docc -s
```

### Using

#### Environment Commands

Config an enviroment
```sh
npx docc -e config
```

Change the enviroment
```sh
npx docc -e change
```

Get the current enviroment
```sh
npx docc -e current
```

#### DCU Commands
Grabing the current environment data
```sh
npx docc -g
```

Starts Watcher + Browsersync. - **Note: [Click here](https://github.com/eduardokeneeth/oracle-commerce-project-example#browsersync) to see how configure Browsersync.**
```sh
npx docc -d
```

Creates widget or element. - **Options:** `widget, element.`
```sh
npx docc -c <type>
```
`Ps.: You need DesignCodeUtility in the root folder.`

Refreshing a path from the current environment
```sh
npx docc -r <path>
```
`path` is relative to the project root as in `widgets/widget/DRV\ Banner`

PutAll sends a path to the current environment
```sh
npx docc -pa <path>
```

Put a file to the current environment
```sh
npx docc -p <file>
```
`file` is relative to the project root as in `widgets/global/app.js`

Transfer a file between current and target environment
```sh
npx docc -t <file>
```

Transfer the entire path between current and target environment. Used to CI/CD deploys
```sh
npx docc -ta <path>
```

## What is the goal of this project?

https://github.com/18F/open-source-guide/blob/18f-pages/pages/making-readmes-readable.md

# Inspiring

- [helioricardo/oracle-commerce-cli](https://github.com/helioricardo/oracle-commerce-cli)
- [leedium/occ-instance-migrator](https://github.com/leedium/occ-instance-migrator)
- [eduhsm/occ-sse-tools](https://github.com/eduhsm/occ-sse-tools)
- [eduardokeneeth/oracle-commerce-project-example](https://github.com/eduardokeneeth/oracle-commerce-project-example#browsersync)
- [eduardokeneeth/oracle-commerce-cli](https://github.com/eduardokeneeth/oracle-commerce-cli)

# Roadmap
https://trello.com/b/0rtMEjKC/driven-occ
