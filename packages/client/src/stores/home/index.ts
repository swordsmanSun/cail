// import { projects as projectsData } from "@temp/projects"
import type { ProjectOptions } from "@tracer/node/types"
import { treeDepth } from '@tracer/utils'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

type Project = ProjectOptions & { depth: number }
export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<ProjectOptions[]>([
        {
            name: "project1",
            type: "pnpm",
            path: "",
            package: "",
            children: [
                {
                    name: "project1-1",
                    type: "pnpm",
                    path: "",
                    package: "",
                    dependencyTree: [
                        {
                            "packageModule": {
                                "name": "react",
                                "version": "18.2.0",
                                "description": "React is a JavaScript library for building user interfaces.",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [
                                    "LICENSE",
                                    "README.md",
                                    "index.js",
                                    "cjs/",
                                    "umd/",
                                    "jsx-runtime.js",
                                    "jsx-dev-runtime.js",
                                    "react.shared-subset.js"
                                ],
                                "scripts": {},
                                "dependencies": {
                                    "loose-envify": "^1.1.0"
                                },
                                "devDependencies": {},
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "react"
                                ],
                                "bugs": "https://github.com/facebook/react/issues",
                                "license": "MIT",
                                "exports": {
                                    ".": {
                                        "react-server": "./react.shared-subset.js",
                                        "default": "./index.js"
                                    },
                                    "./package.json": "./package.json",
                                    "./jsx-runtime": "./jsx-runtime.js",
                                    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "https://github.com/facebook/react.git",
                                    "directory": "packages/react"
                                },
                                "engines": {
                                    "node": ">=0.10.0"
                                },
                                "browserify": {
                                    "transform": [
                                        "loose-envify"
                                    ]
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "loose-envify",
                                        "version": "1.4.0",
                                        "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                        "main": "index.js",
                                        "module": "",
                                        "types": "",
                                        "files": [],
                                        "scripts": {
                                            "test": "tap test/*.js"
                                        },
                                        "dependencies": {
                                            "js-tokens": "^3.0.0 || ^4.0.0",
                                            "react": "^18.2.0"
                                        },
                                        "devDependencies": {
                                            "browserify": "^13.1.1",
                                            "envify": "^3.4.0",
                                            "tap": "^8.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "environment",
                                            "variables",
                                            "browserify",
                                            "browserify-transform",
                                            "transform",
                                            "source",
                                            "configuration"
                                        ],
                                        "author": "Andres Suarez <zertosh@gmail.com>",
                                        "bin": {
                                            "loose-envify": "cli.js"
                                        },
                                        "repository": {
                                            "type": "git",
                                            "url": "git://github.com/zertosh/loose-envify.git"
                                        }
                                    },
                                    "children": [
                                        {
                                            "packageModule": {
                                                "name": "js-tokens",
                                                "version": "4.0.0",
                                                "description": "A regex that tokenizes JavaScript.",
                                                "main": "",
                                                "module": "",
                                                "types": "",
                                                "files": [
                                                    "index.js"
                                                ],
                                                "scripts": {
                                                    "test": "mocha --ui tdd",
                                                    "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                                    "build": "node generate-index.js",
                                                    "dev": "npm run build && npm test"
                                                },
                                                "dependencies": {},
                                                "devDependencies": {
                                                    "coffeescript": "2.1.1",
                                                    "esprima": "4.0.0",
                                                    "everything.js": "1.0.3",
                                                    "mocha": "5.0.0"
                                                },
                                                "peerDependencies": {},
                                                "optionalDependencies": {},
                                                "bundledDependencies": [],
                                                "keywords": [
                                                    "JavaScript",
                                                    "trst",
                                                    "js",
                                                    "token",
                                                    "tokenize",
                                                    "regex"
                                                ],
                                                "license": "MIT",
                                                "repository": "lydell/js-tokens"
                                            }
                                        },
                                        {
                                            "isCircular": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    depth: 2
                },
                {
                    name: "project1-2",
                    type: "pnpm",
                    path: "",
                    package: "",
                    dependencyTree: [
                        {
                            "packageModule": {
                                "name": "react",
                                "version": "18.2.0",
                                "description": "React is a JavaScript library for building user interfaces.",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [
                                    "LICENSE",
                                    "README.md",
                                    "index.js",
                                    "cjs/",
                                    "umd/",
                                    "jsx-runtime.js",
                                    "jsx-dev-runtime.js",
                                    "react.shared-subset.js"
                                ],
                                "scripts": {},
                                "dependencies": {
                                    "loose-envify": "^1.1.0"
                                },
                                "devDependencies": {},
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "react"
                                ],
                                "bugs": "https://github.com/facebook/react/issues",
                                "license": "MIT",
                                "exports": {
                                    ".": {
                                        "react-server": "./react.shared-subset.js",
                                        "default": "./index.js"
                                    },
                                    "./package.json": "./package.json",
                                    "./jsx-runtime": "./jsx-runtime.js",
                                    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "https://github.com/facebook/react.git",
                                    "directory": "packages/react"
                                },
                                "engines": {
                                    "node": ">=0.10.0"
                                },
                                "browserify": {
                                    "transform": [
                                        "loose-envify"
                                    ]
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "loose-envify",
                                        "version": "1.4.0",
                                        "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                        "main": "index.js",
                                        "module": "",
                                        "types": "",
                                        "files": [],
                                        "scripts": {
                                            "test": "tap test/*.js"
                                        },
                                        "dependencies": {
                                            "js-tokens": "^3.0.0 || ^4.0.0",
                                            "react": "^18.2.0"
                                        },
                                        "devDependencies": {
                                            "browserify": "^13.1.1",
                                            "envify": "^3.4.0",
                                            "tap": "^8.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "environment",
                                            "variables",
                                            "browserify",
                                            "browserify-transform",
                                            "transform",
                                            "source",
                                            "configuration"
                                        ],
                                        "author": "Andres Suarez <zertosh@gmail.com>",
                                        "bin": {
                                            "loose-envify": "cli.js"
                                        },
                                        "repository": {
                                            "type": "git",
                                            "url": "git://github.com/zertosh/loose-envify.git"
                                        }
                                    },
                                    "children": [
                                        {
                                            "packageModule": {
                                                "name": "js-tokens",
                                                "version": "4.0.0",
                                                "description": "A regex that tokenizes JavaScript.",
                                                "main": "",
                                                "module": "",
                                                "types": "",
                                                "files": [
                                                    "index.js"
                                                ],
                                                "scripts": {
                                                    "test": "mocha --ui tdd",
                                                    "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                                    "build": "node generate-index.js",
                                                    "dev": "npm run build && npm test"
                                                },
                                                "dependencies": {},
                                                "devDependencies": {
                                                    "coffeescript": "2.1.1",
                                                    "esprima": "4.0.0",
                                                    "everything.js": "1.0.3",
                                                    "mocha": "5.0.0"
                                                },
                                                "peerDependencies": {},
                                                "optionalDependencies": {},
                                                "bundledDependencies": [],
                                                "keywords": [
                                                    "JavaScript",
                                                    "trst",
                                                    "js",
                                                    "token",
                                                    "tokenize",
                                                    "regex"
                                                ],
                                                "license": "MIT",
                                                "repository": "lydell/js-tokens"
                                            }
                                        },
                                        {
                                            "isCircular": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    depth: 2
                },
                {
                    name: "project1-3",
                    type: "pnpm",
                    path: "",
                    package: "",
                    dependencyTree: [
                        {
                            "packageModule": {
                                "name": "react",
                                "version": "18.2.0",
                                "description": "React is a JavaScript library for building user interfaces.",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [
                                    "LICENSE",
                                    "README.md",
                                    "index.js",
                                    "cjs/",
                                    "umd/",
                                    "jsx-runtime.js",
                                    "jsx-dev-runtime.js",
                                    "react.shared-subset.js"
                                ],
                                "scripts": {},
                                "dependencies": {
                                    "loose-envify": "^1.1.0"
                                },
                                "devDependencies": {},
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "react"
                                ],
                                "bugs": "https://github.com/facebook/react/issues",
                                "license": "MIT",
                                "exports": {
                                    ".": {
                                        "react-server": "./react.shared-subset.js",
                                        "default": "./index.js"
                                    },
                                    "./package.json": "./package.json",
                                    "./jsx-runtime": "./jsx-runtime.js",
                                    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "https://github.com/facebook/react.git",
                                    "directory": "packages/react"
                                },
                                "engines": {
                                    "node": ">=0.10.0"
                                },
                                "browserify": {
                                    "transform": [
                                        "loose-envify"
                                    ]
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "loose-envify",
                                        "version": "1.4.0",
                                        "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                        "main": "index.js",
                                        "module": "",
                                        "types": "",
                                        "files": [],
                                        "scripts": {
                                            "test": "tap test/*.js"
                                        },
                                        "dependencies": {
                                            "js-tokens": "^3.0.0 || ^4.0.0",
                                            "react": "^18.2.0"
                                        },
                                        "devDependencies": {
                                            "browserify": "^13.1.1",
                                            "envify": "^3.4.0",
                                            "tap": "^8.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "environment",
                                            "variables",
                                            "browserify",
                                            "browserify-transform",
                                            "transform",
                                            "source",
                                            "configuration"
                                        ],
                                        "author": "Andres Suarez <zertosh@gmail.com>",
                                        "bin": {
                                            "loose-envify": "cli.js"
                                        },
                                        "repository": {
                                            "type": "git",
                                            "url": "git://github.com/zertosh/loose-envify.git"
                                        }
                                    },
                                    "children": [
                                        {
                                            "packageModule": {
                                                "name": "js-tokens",
                                                "version": "4.0.0",
                                                "description": "A regex that tokenizes JavaScript.",
                                                "main": "",
                                                "module": "",
                                                "types": "",
                                                "files": [
                                                    "index.js"
                                                ],
                                                "scripts": {
                                                    "test": "mocha --ui tdd",
                                                    "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                                    "build": "node generate-index.js",
                                                    "dev": "npm run build && npm test"
                                                },
                                                "dependencies": {},
                                                "devDependencies": {
                                                    "coffeescript": "2.1.1",
                                                    "esprima": "4.0.0",
                                                    "everything.js": "1.0.3",
                                                    "mocha": "5.0.0"
                                                },
                                                "peerDependencies": {},
                                                "optionalDependencies": {},
                                                "bundledDependencies": [],
                                                "keywords": [
                                                    "JavaScript",
                                                    "trst",
                                                    "js",
                                                    "token",
                                                    "tokenize",
                                                    "regex"
                                                ],
                                                "license": "MIT",
                                                "repository": "lydell/js-tokens"
                                            }
                                        },
                                        {
                                            "isCircular": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    depth: 2
                }
            ],
            dependencyTree: [
                {
                    "packageModule": {
                        "name": "react",
                        "version": "18.2.0",
                        "description": "React is a JavaScript library for building user interfaces.",
                        "main": "index.js",
                        "module": "",
                        "types": "",
                        "files": [
                            "LICENSE",
                            "README.md",
                            "index.js",
                            "cjs/",
                            "umd/",
                            "jsx-runtime.js",
                            "jsx-dev-runtime.js",
                            "react.shared-subset.js"
                        ],
                        "scripts": {},
                        "dependencies": {
                            "loose-envify": "^1.1.0"
                        },
                        "devDependencies": {},
                        "peerDependencies": {},
                        "optionalDependencies": {},
                        "bundledDependencies": [],
                        "keywords": [
                            "react"
                        ],
                        "bugs": "https://github.com/facebook/react/issues",
                        "license": "MIT",
                        "exports": {
                            ".": {
                                "react-server": "./react.shared-subset.js",
                                "default": "./index.js"
                            },
                            "./package.json": "./package.json",
                            "./jsx-runtime": "./jsx-runtime.js",
                            "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                        },
                        "repository": {
                            "type": "git",
                            "url": "https://github.com/facebook/react.git",
                            "directory": "packages/react"
                        },
                        "engines": {
                            "node": ">=0.10.0"
                        },
                        "browserify": {
                            "transform": [
                                "loose-envify"
                            ]
                        }
                    },
                    "children": [
                        {
                            "packageModule": {
                                "name": "loose-envify",
                                "version": "1.4.0",
                                "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [],
                                "scripts": {
                                    "test": "tap test/*.js"
                                },
                                "dependencies": {
                                    "js-tokens": "^3.0.0 || ^4.0.0",
                                    "react": "^18.2.0"
                                },
                                "devDependencies": {
                                    "browserify": "^13.1.1",
                                    "envify": "^3.4.0",
                                    "tap": "^8.0.0"
                                },
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "environment",
                                    "variables",
                                    "browserify",
                                    "browserify-transform",
                                    "transform",
                                    "source",
                                    "configuration"
                                ],
                                "author": "Andres Suarez <zertosh@gmail.com>",
                                "bin": {
                                    "loose-envify": "cli.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "git://github.com/zertosh/loose-envify.git"
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "js-tokens",
                                        "version": "4.0.0",
                                        "description": "A regex that tokenizes JavaScript.",
                                        "main": "",
                                        "module": "",
                                        "types": "",
                                        "files": [
                                            "index.js"
                                        ],
                                        "scripts": {
                                            "test": "mocha --ui tdd",
                                            "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                            "build": "node generate-index.js",
                                            "dev": "npm run build && npm test"
                                        },
                                        "dependencies": {},
                                        "devDependencies": {
                                            "coffeescript": "2.1.1",
                                            "esprima": "4.0.0",
                                            "everything.js": "1.0.3",
                                            "mocha": "5.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "JavaScript",
                                            "trst",
                                            "js",
                                            "token",
                                            "tokenize",
                                            "regex"
                                        ],
                                        "license": "MIT",
                                        "repository": "lydell/js-tokens"
                                    }
                                },
                                {
                                    "isCircular": true
                                }
                            ]
                        }
                    ]
                }
            ],
            depth: 2
        },
        {
            name: "project2",
            type: "pnpm",
            path: "",
            package: "",
            dependencyTree: [
                {
                    "packageModule": {
                        "name": "react",
                        "version": "18.2.0",
                        "description": "React is a JavaScript library for building user interfaces.",
                        "main": "index.js",
                        "module": "",
                        "types": "",
                        "files": [
                            "LICENSE",
                            "README.md",
                            "index.js",
                            "cjs/",
                            "umd/",
                            "jsx-runtime.js",
                            "jsx-dev-runtime.js",
                            "react.shared-subset.js"
                        ],
                        "scripts": {},
                        "dependencies": {
                            "loose-envify": "^1.1.0"
                        },
                        "devDependencies": {},
                        "peerDependencies": {},
                        "optionalDependencies": {},
                        "bundledDependencies": [],
                        "keywords": [
                            "react"
                        ],
                        "bugs": "https://github.com/facebook/react/issues",
                        "license": "MIT",
                        "exports": {
                            ".": {
                                "react-server": "./react.shared-subset.js",
                                "default": "./index.js"
                            },
                            "./package.json": "./package.json",
                            "./jsx-runtime": "./jsx-runtime.js",
                            "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                        },
                        "repository": {
                            "type": "git",
                            "url": "https://github.com/facebook/react.git",
                            "directory": "packages/react"
                        },
                        "engines": {
                            "node": ">=0.10.0"
                        },
                        "browserify": {
                            "transform": [
                                "loose-envify"
                            ]
                        }
                    },
                    "children": [
                        {
                            "packageModule": {
                                "name": "loose-envify",
                                "version": "1.4.0",
                                "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [],
                                "scripts": {
                                    "test": "tap test/*.js"
                                },
                                "dependencies": {
                                    "js-tokens": "^3.0.0 || ^4.0.0",
                                    "react": "^18.2.0"
                                },
                                "devDependencies": {
                                    "browserify": "^13.1.1",
                                    "envify": "^3.4.0",
                                    "tap": "^8.0.0"
                                },
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "environment",
                                    "variables",
                                    "browserify",
                                    "browserify-transform",
                                    "transform",
                                    "source",
                                    "configuration"
                                ],
                                "author": "Andres Suarez <zertosh@gmail.com>",
                                "bin": {
                                    "loose-envify": "cli.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "git://github.com/zertosh/loose-envify.git"
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "js-tokens",
                                        "version": "4.0.0",
                                        "description": "A regex that tokenizes JavaScript.",
                                        "main": "",
                                        "module": "",
                                        "types": "",
                                        "files": [
                                            "index.js"
                                        ],
                                        "scripts": {
                                            "test": "mocha --ui tdd",
                                            "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                            "build": "node generate-index.js",
                                            "dev": "npm run build && npm test"
                                        },
                                        "dependencies": {},
                                        "devDependencies": {
                                            "coffeescript": "2.1.1",
                                            "esprima": "4.0.0",
                                            "everything.js": "1.0.3",
                                            "mocha": "5.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "JavaScript",
                                            "trst",
                                            "js",
                                            "token",
                                            "tokenize",
                                            "regex"
                                        ],
                                        "license": "MIT",
                                        "repository": "lydell/js-tokens"
                                    }
                                },
                                {
                                    "isCircular": true
                                }
                            ]
                        }
                    ]
                }
            ],
            depth: 2,
            children: [
                {
                    name: "project2-1",
                    type: "pnpm",
                    path: "",
                    package: "",
                    dependencyTree: [
                        {
                            "packageModule": {
                                "name": "react",
                                "version": "18.2.0",
                                "description": "React is a JavaScript library for building user interfaces.",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [
                                    "LICENSE",
                                    "README.md",
                                    "index.js",
                                    "cjs/",
                                    "umd/",
                                    "jsx-runtime.js",
                                    "jsx-dev-runtime.js",
                                    "react.shared-subset.js"
                                ],
                                "scripts": {},
                                "dependencies": {
                                    "loose-envify": "^1.1.0"
                                },
                                "devDependencies": {},
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "react"
                                ],
                                "bugs": "https://github.com/facebook/react/issues",
                                "license": "MIT",
                                "exports": {
                                    ".": {
                                        "react-server": "./react.shared-subset.js",
                                        "default": "./index.js"
                                    },
                                    "./package.json": "./package.json",
                                    "./jsx-runtime": "./jsx-runtime.js",
                                    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "https://github.com/facebook/react.git",
                                    "directory": "packages/react"
                                },
                                "engines": {
                                    "node": ">=0.10.0"
                                },
                                "browserify": {
                                    "transform": [
                                        "loose-envify"
                                    ]
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "loose-envify",
                                        "version": "1.4.0",
                                        "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                        "main": "index.js",
                                        "module": "",
                                        "types": "",
                                        "files": [],
                                        "scripts": {
                                            "test": "tap test/*.js"
                                        },
                                        "dependencies": {
                                            "js-tokens": "^3.0.0 || ^4.0.0",
                                            "react": "^18.2.0"
                                        },
                                        "devDependencies": {
                                            "browserify": "^13.1.1",
                                            "envify": "^3.4.0",
                                            "tap": "^8.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "environment",
                                            "variables",
                                            "browserify",
                                            "browserify-transform",
                                            "transform",
                                            "source",
                                            "configuration"
                                        ],
                                        "author": "Andres Suarez <zertosh@gmail.com>",
                                        "bin": {
                                            "loose-envify": "cli.js"
                                        },
                                        "repository": {
                                            "type": "git",
                                            "url": "git://github.com/zertosh/loose-envify.git"
                                        }
                                    },
                                    "children": [
                                        {
                                            "packageModule": {
                                                "name": "js-tokens",
                                                "version": "4.0.0",
                                                "description": "A regex that tokenizes JavaScript.",
                                                "main": "",
                                                "module": "",
                                                "types": "",
                                                "files": [
                                                    "index.js"
                                                ],
                                                "scripts": {
                                                    "test": "mocha --ui tdd",
                                                    "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                                    "build": "node generate-index.js",
                                                    "dev": "npm run build && npm test"
                                                },
                                                "dependencies": {},
                                                "devDependencies": {
                                                    "coffeescript": "2.1.1",
                                                    "esprima": "4.0.0",
                                                    "everything.js": "1.0.3",
                                                    "mocha": "5.0.0"
                                                },
                                                "peerDependencies": {},
                                                "optionalDependencies": {},
                                                "bundledDependencies": [],
                                                "keywords": [
                                                    "JavaScript",
                                                    "trst",
                                                    "js",
                                                    "token",
                                                    "tokenize",
                                                    "regex"
                                                ],
                                                "license": "MIT",
                                                "repository": "lydell/js-tokens"
                                            }
                                        },
                                        {
                                            "isCircular": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    depth: 2
                },
                {
                    name: "project2-2",
                    type: "pnpm",
                    path: "",
                    package: "",
                    dependencyTree: [
                        {
                            "packageModule": {
                                "name": "react",
                                "version": "18.2.0",
                                "description": "React is a JavaScript library for building user interfaces.",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [
                                    "LICENSE",
                                    "README.md",
                                    "index.js",
                                    "cjs/",
                                    "umd/",
                                    "jsx-runtime.js",
                                    "jsx-dev-runtime.js",
                                    "react.shared-subset.js"
                                ],
                                "scripts": {},
                                "dependencies": {
                                    "loose-envify": "^1.1.0"
                                },
                                "devDependencies": {},
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "react"
                                ],
                                "bugs": "https://github.com/facebook/react/issues",
                                "license": "MIT",
                                "exports": {
                                    ".": {
                                        "react-server": "./react.shared-subset.js",
                                        "default": "./index.js"
                                    },
                                    "./package.json": "./package.json",
                                    "./jsx-runtime": "./jsx-runtime.js",
                                    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "https://github.com/facebook/react.git",
                                    "directory": "packages/react"
                                },
                                "engines": {
                                    "node": ">=0.10.0"
                                },
                                "browserify": {
                                    "transform": [
                                        "loose-envify"
                                    ]
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "loose-envify",
                                        "version": "1.4.0",
                                        "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                        "main": "index.js",
                                        "module": "",
                                        "types": "",
                                        "files": [],
                                        "scripts": {
                                            "test": "tap test/*.js"
                                        },
                                        "dependencies": {
                                            "js-tokens": "^3.0.0 || ^4.0.0",
                                            "react": "^18.2.0"
                                        },
                                        "devDependencies": {
                                            "browserify": "^13.1.1",
                                            "envify": "^3.4.0",
                                            "tap": "^8.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "environment",
                                            "variables",
                                            "browserify",
                                            "browserify-transform",
                                            "transform",
                                            "source",
                                            "configuration"
                                        ],
                                        "author": "Andres Suarez <zertosh@gmail.com>",
                                        "bin": {
                                            "loose-envify": "cli.js"
                                        },
                                        "repository": {
                                            "type": "git",
                                            "url": "git://github.com/zertosh/loose-envify.git"
                                        }
                                    },
                                    "children": [
                                        {
                                            "packageModule": {
                                                "name": "js-tokens",
                                                "version": "4.0.0",
                                                "description": "A regex that tokenizes JavaScript.",
                                                "main": "",
                                                "module": "",
                                                "types": "",
                                                "files": [
                                                    "index.js"
                                                ],
                                                "scripts": {
                                                    "test": "mocha --ui tdd",
                                                    "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                                    "build": "node generate-index.js",
                                                    "dev": "npm run build && npm test"
                                                },
                                                "dependencies": {},
                                                "devDependencies": {
                                                    "coffeescript": "2.1.1",
                                                    "esprima": "4.0.0",
                                                    "everything.js": "1.0.3",
                                                    "mocha": "5.0.0"
                                                },
                                                "peerDependencies": {},
                                                "optionalDependencies": {},
                                                "bundledDependencies": [],
                                                "keywords": [
                                                    "JavaScript",
                                                    "trst",
                                                    "js",
                                                    "token",
                                                    "tokenize",
                                                    "regex"
                                                ],
                                                "license": "MIT",
                                                "repository": "lydell/js-tokens"
                                            }
                                        },
                                        {
                                            "isCircular": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    depth: 2
                },
                {
                    name: "project2-3",
                    type: "pnpm",
                    path: "",
                    package: "",
                    dependencyTree: [
                        {
                            "packageModule": {
                                "name": "react",
                                "version": "18.2.0",
                                "description": "React is a JavaScript library for building user interfaces.",
                                "main": "index.js",
                                "module": "",
                                "types": "",
                                "files": [
                                    "LICENSE",
                                    "README.md",
                                    "index.js",
                                    "cjs/",
                                    "umd/",
                                    "jsx-runtime.js",
                                    "jsx-dev-runtime.js",
                                    "react.shared-subset.js"
                                ],
                                "scripts": {},
                                "dependencies": {
                                    "loose-envify": "^1.1.0"
                                },
                                "devDependencies": {},
                                "peerDependencies": {},
                                "optionalDependencies": {},
                                "bundledDependencies": [],
                                "keywords": [
                                    "react"
                                ],
                                "bugs": "https://github.com/facebook/react/issues",
                                "license": "MIT",
                                "exports": {
                                    ".": {
                                        "react-server": "./react.shared-subset.js",
                                        "default": "./index.js"
                                    },
                                    "./package.json": "./package.json",
                                    "./jsx-runtime": "./jsx-runtime.js",
                                    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
                                },
                                "repository": {
                                    "type": "git",
                                    "url": "https://github.com/facebook/react.git",
                                    "directory": "packages/react"
                                },
                                "engines": {
                                    "node": ">=0.10.0"
                                },
                                "browserify": {
                                    "transform": [
                                        "loose-envify"
                                    ]
                                }
                            },
                            "children": [
                                {
                                    "packageModule": {
                                        "name": "loose-envify",
                                        "version": "1.4.0",
                                        "description": "Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST",
                                        "main": "index.js",
                                        "module": "",
                                        "types": "",
                                        "files": [],
                                        "scripts": {
                                            "test": "tap test/*.js"
                                        },
                                        "dependencies": {
                                            "js-tokens": "^3.0.0 || ^4.0.0",
                                            "react": "^18.2.0"
                                        },
                                        "devDependencies": {
                                            "browserify": "^13.1.1",
                                            "envify": "^3.4.0",
                                            "tap": "^8.0.0"
                                        },
                                        "peerDependencies": {},
                                        "optionalDependencies": {},
                                        "bundledDependencies": [],
                                        "keywords": [
                                            "environment",
                                            "variables",
                                            "browserify",
                                            "browserify-transform",
                                            "transform",
                                            "source",
                                            "configuration"
                                        ],
                                        "author": "Andres Suarez <zertosh@gmail.com>",
                                        "bin": {
                                            "loose-envify": "cli.js"
                                        },
                                        "repository": {
                                            "type": "git",
                                            "url": "git://github.com/zertosh/loose-envify.git"
                                        }
                                    },
                                    "children": [
                                        {
                                            "packageModule": {
                                                "name": "js-tokens",
                                                "version": "4.0.0",
                                                "description": "A regex that tokenizes JavaScript.",
                                                "main": "",
                                                "module": "",
                                                "types": "",
                                                "files": [
                                                    "index.js"
                                                ],
                                                "scripts": {
                                                    "test": "mocha --ui tdd",
                                                    "esprima-compare": "node esprima-compare ./index.js everything.js/es5.js",
                                                    "build": "node generate-index.js",
                                                    "dev": "npm run build && npm test"
                                                },
                                                "dependencies": {},
                                                "devDependencies": {
                                                    "coffeescript": "2.1.1",
                                                    "esprima": "4.0.0",
                                                    "everything.js": "1.0.3",
                                                    "mocha": "5.0.0"
                                                },
                                                "peerDependencies": {},
                                                "optionalDependencies": {},
                                                "bundledDependencies": [],
                                                "keywords": [
                                                    "JavaScript",
                                                    "trst",
                                                    "js",
                                                    "token",
                                                    "tokenize",
                                                    "regex"
                                                ],
                                                "license": "MIT",
                                                "repository": "lydell/js-tokens"
                                            }
                                        },
                                        {
                                            "isCircular": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    depth: 2
                }
            ]
        }
    ])

    const currentProject = ref<Project>()

    function setCurrentProject(project: Project) {
        // currentProject.value = {
        //     ...project,
        //     depth: treeDepth({ children: project.dependencyTree })
        // }
    }


    return { projects, currentProject, setCurrentProject }
})

