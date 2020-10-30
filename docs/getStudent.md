[🔙 ](https://github.com/vtfk/minelev-api#get-studentsid)

### ```GET /students/:id```

Returns an object of given student with available documents

Example response:

```JSON
{
  "data": {
    "id": "bra2001",
    "firstName": "Brage",
    "lastName": "Dahle",
    "fullName": "Brage Dahl",
    "birthdate": "2009-01-20T00:00:00.000Z",
    "username": "bra2001",
    "mail": "bra2001@skole.vtfk.no",
    "mobile": "",
    "schoolId": "TESVS",
    "schoolName": "Testen videregående skole",
    "schoolShortName": "Testen vgs",
    "classId": "TESVS:TEST",
    "classShortId": "TEST",
    "programomraade": {
      "kode": "BABAT1----",
      "type": "yrkesfaglig",
      "tittel": {
        "default": "Bygg- og anleggsteknikk",
        "nob": "Bygg- og anleggsteknikk",
        "nno": "Bygg- og anleggsteknikk"
      },
      "kortform": {
        "default": "Bygg- og anleggsteknikk",
        "nob": "Bygg- og anleggsteknikk",
        "nno": "Bygg- og anleggsteknikk"
      }
    },
    "utdanningsprogram": {
      "kode": "BA",
      "type": "yrkesfaglig",
      "tittel": {
        "default": "Bygg- og anleggsteknikk",
        "nob": "Bygg- og anleggsteknikk",
        "nno": "Bygg- og anleggsteknikk"
      },
      "kortform": {
        "default": "Bygg- og anleggsteknikk",
        "nob": "Bygg- og anleggsteknikk",
        "nno": "Bygg- og anleggsteknikk"
      }
    }
  }
}
```
