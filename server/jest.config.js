module.exports = {
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "globals": {
        "ts-jest": {
            "tsconfig": "tsconfig.spec.json"
        }
    },
    "testMatch": [
        "**/*.test.ts",
        "**/*.integ.ts"
    ]
}
