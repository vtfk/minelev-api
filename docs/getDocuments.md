[🔙 ](https://github.com/vtfk/minelev-api#get-documentsid)

### ```GET /documents/:id```

Returns documents for all your students

> #### Please note
> * To filter what types of documents you want returned, pass the `type` query parameter. Example: `?type=varsel`

<br />

Example response:

```JSON
{
  "data": [
    {
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
        "lastName": "Dahl",
        "personalIdNumber": "20010313456",
        "mobile": "",
        "mail": "bra2001@skole.vtfk.no"
      },
      "content": {
        ...
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
    }
  ],
  "count": 1
}
```
