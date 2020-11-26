[🔙 ](https://github.com/vtfk/minelev-api#post-documents)

### ```POST /documents``` or ```/students/{id}/documents```

Creates a new document, and returns the created document

If you are using the `/student` endpoint, the student.username property doesn't have to be filled in.

Example request:

```json
{
  "type": "varsel",
  "variant": "fag",
  "student": {
    "username": "bra2001"
  },
  "content": {
    // Varies based on type and variant
  }
}
```

Example response:

```json
{
  "data": {
    "_id": "5fbd76e831e7a9203abc56ea",
    "created": {
      "timestamp": 1606252264318,
      "createdBy": "tes0101"
    },
    "modified": [
      {
        "timestamp": 1606252264318,
        "modifiedBy": "tes0101"
      }
    ],
    "type": "varsel",
    "variant": "fag",
    "student": {
      "username": "bra2001",
      "name": "Brage Dahl",
      "firstName": "Brage",
      "lastName": "Dahl"
    },
    "content": {
      // Varies based on type and variant (see examples below)
    },
    "teacher": {
      "username": "tes0101",
      "name": "Testine Testen",
      "firstName": "Testine",
      "lastName": "Testen"
    },
    "school": {
      "id": "TESVS",
      "name": "Testen videregående skole",
      "shortName": "Testen vgs"
    },
    "isEncrypted": false,
    "status": [
      {
        "status": "queued",
        "timestamp": 1606252264318
      }
    ],
    "isQueued": true
  }
}
```

### Example type content

#### Varsel

##### Fag

```json
{
  "type": "varsel",
  "variant": "fag",
  "content": {
    "year": "2020/2021",
    "period": {
      "id": 1,
      "nb": "Halvårsvurdering 1. termin",
      "nn": "Halvårsvurdering 1. termin",
      "en": "1st term half-yearly assessment"
    },
    "classes": [
      {
        "id": "TESVS:TEST/201NOR1208",
        "nb": "Norsk hovedmål, skriftlig",
        "nn": "Norsk hovudmål, skriftleg",
        "en": "Norwegian as 1st lang, written"
      }
    ],
    "reasons": [
      {
        "id": 1,
        "nb": "Du har manglende vurderingsgrunnlag",
        "nn": "Du har manglande vurderingsgrunnlag",
        "en": "You have a lack of assessments",
      }
    ]
  }
}
```

#### Atferd

```json
{
  "type": "varsel",
  "variant": "atferd",
  "content": {
    "year": "2020/2021",
    "period": {
      "id": 1,
      "nb": "Halvårsvurdering 1. termin",
      "nn": "Halvårsvurdering 1. termin",
      "en": "1st term half-yearly assessment"
    },
    "reasons": [
      {
        "id": 1,
        "nb": "Du har fusket",
        "nn": "Du har fusket",
        "en": "You have cheated",
      }
    ]
  }
}
```

#### Orden

```json
{
  "type": "varsel",
  "variant": "orden",
  "content": {
    "year": "2020/2021",
    "period": {
      "id": 1,
      "nb": "Halvårsvurdering 1. termin",
      "nn": "Halvårsvurdering 1. termin",
      "en": "1st term half-yearly assessment"
    },
    "reasons": [
      {
        "id": 1,
        "nb": "Du har udokumentert fravær",
        "nn": "Du har udokumentert fråvær",
        "en": "You have undocumented absence",
      }
    ]
  }
}
```

### Samtale

#### Samtale

```json
{
  "type": "samtale",
  "variant": "samtale",
  "content": {
    "samtale": true
  }
}
```

#### Ikke-samtale

```json
{
  "type": "samtale",
  "variant": "ikke-samtale",
  "content": {
    "samtale": false
  }
}
```

### Notat

#### notat

Content with this type will be [encrypted](https://github.com/vtfk/minelev-api/blob/main/lib/encryption.js) on storage.

```json
{
  "type": "notat",
  "variant": "notat",
  "content": {
    "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget hendrerit lacus. Cras sit amet sodales massa. Nullam bibendum gravida ligula nec vulputate. Donec sodales sodales sagittis. Aenean nisl velit, porttitor gravida vehicula quis, euismod id tortor. Mauris sed consequat dui. Etiam tempus leo vel aliquam porta. Ut eget maximus dolor.\n\nProin rutrum nisi accumsan, ultrices diam a, gravida augue. Sed et leo lectus. Nunc consequat urna eget magna elementum, eu feugiat diam imperdiet. Integer dolor tellus, sollicitudin et ultrices non, pulvinar eget dui. Fusce diam mi, tempor sed turpis id, congue blandit velit. Cras vitae sapien rhoncus, elementum magna id, scelerisque quam. Quisque pretium arcu at dolor elementum, sit amet lobortis nulla laoreet. Proin euismod at ipsum imperdiet molestie. Mauris non sodales lacus, vel hendrerit lectus. Fusce malesuada vulputate faucibus."
  }
}
```

### YFF

#### yff-bekreftelse

#### yff-bekreftelse-bedrift

#### yff-lokalplan-maal

#### yff-tilbakemelding