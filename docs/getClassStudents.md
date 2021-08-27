[🔙 ](https://github.com/vtfk/minelev-api#get-classesidstudents)

### ```GET /classes/:id/students```

Returns the students of a specific class

> #### Please note
> * The ID url property should be double URL Encoded
> * Returns the student object, but without the `groups` property
> * Read more about the values in ``utdanningsprogram`` [here](./grep.md)

<br />

Example response:

```JSON
{
  "data": [
    {
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
    },
    [...]
  ],
  "count": 3
}
```
