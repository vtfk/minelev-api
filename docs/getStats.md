[🔙 ](https://github.com/vtfk/minelev-api#get-stats)

### ```GET /stats```

Example response:

```JSON
{
  "count": 6
}
```

### ```GET /stats/type```

Example response:

```JSON
[
  {
    "type": "notat",
    "variants": [
      {
        "variant": "notat",
        "count": 2
      }
    ],
    "count": 2
  },
  {
    "type": "samtale",
    "variants": [
      {
        "variant": "ikke-samtale",
        "count": 1
      }
    ],
    "count": 1
  },
  {
    "type": "varsel",
    "variants": [
      {
        "variant": "fag",
        "count": 1
      },
      {
        "variant": "orden",
        "count": 1
      },
      {
        "variant": "atferd",
        "count": 1
      }
    ],
    "count": 3
  }
]
```

### ```GET /stats/school```

Example response:

```JSON
[
  {
    "id": "TESVS",
    "name": "Testen videregående skole",
    "count": 3,
    "types": [
      {
        "type": "notat",
        "count": 2
      },
      {
        "type": "samtale",
        "count": 1
      },
      {
        "type": "varsel",
        "count": 3
      }
    ],
    "count": 6
  }
]
```

### ```GET /stats/type/school```

Example response:

```JSON
[
  {
    "type": "notat",
    "schools": [
      {
        "id": "TESVS",
        "name": "Testen videregående skole",
        "count": 2
      }
    ],
    "count": 2
  },
  {
    "type": "samtale",
    "schools": [
      {
        "id": "TESVS",
        "name": "Testen videregående skole",
        "count": 1
      }
    ],
    "count": 1
  },
  {
    "type": "varsel",
    "schools": [
      {
        "id": "TESVS",
        "name": "Testen videregående skole",
        "count": 3
      }
    ],
    "count": 3
  }
]
```