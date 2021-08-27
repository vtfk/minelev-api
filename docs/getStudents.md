[🔙 ](https://github.com/vtfk/minelev-api#get-students)

### ```GET /students```

Returns an array of current users students

Example response:

```JSON
{
  "data": [
    {
      "id": "bra2001",
      "firstName": "Brage",
      "lastName": "Dahl",
      "fullName": "Brage Dahl",
      "birthdate": "2009-01-20T00:00:00.000Z",
      "username": "bra2001",
      "mail": "bra2001@skole.vtfk.no",
      "mobile": "+47 98765432",
      "schoolId": "TESVS",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "classId": "TESVS:TEST",
      "classShortId": "TEST",
      "utdanningsprogram": [
        {
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
      ]
    },
    {
      "id": "ari0101",
      "firstName": "Arild",
      "lastName": "Testen",
      "fullName": "Arild Testen",
      "birthdate": "2001-01-01T00:00:00.000Z",
      "username": "ari0101",
      "mail": "ari0101@skole.vtfk.no",
      "mobile": "+47 45678910",
      "schoolId": "TESVS",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "classId": "TESVS:TEST",
      "classShortId": "TEST",
      "utdanningsprogram": [
        {
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
      ]
    }
  ],
  "count": 2
}
```
