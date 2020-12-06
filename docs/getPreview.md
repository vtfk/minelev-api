[🔙 ](https://github.com/vtfk/minelev-api#post-documentspreview)

### ```POST /documents/preview```

Generates the document and returns the b64 pdf preview. Uses the same input format as [POST /documents](./postDocument.md)

> #### Please note
> * To select a different language, pass the `language` query parameter. `nb`, `nn` and `en` are valid values. Example: `?language=nn`.

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
    "system": "minelev",
    "template": "varsel-fag",
    "language": "nb",
    "data": {
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
        "lastName": "Dahl",
        "mobile": "",
        "mail": "bra2001@skole.vtfk.no",
        "classId": "TESVS:TEST1"
      },
      "content": {
        // Varies based on type and variant (see examples below)
      },
      "teacher": {
        "username": "tes0101",
        "name": "Testine Testen",
        "firstName": "Testine",
          "lastName": "Testen",
          "mobile": "4798765432",
          "mail": "tes0101@vtfk.no"
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
    },
    "base64": "JVBERi0xLjMKJf////8KOC<pdf-base64>=="
  }
}
```
