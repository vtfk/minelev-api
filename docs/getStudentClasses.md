[🔙 ](https://github.com/vtfk/minelev-api#get-studentsidclasses)

### ```GET /students/:id/classes```

Returns the students classes

Example response:

```JSON
{
  "data": [
    {
      "id": "7_HSF1008_TESVS@38016",
      "type": "fag",
      "name": "HSF1008_TESVS@38016",
      "groupId": "Yrkesliv i helse- og oppv.fag",
      "schoolId": "TESVS@38016",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "grep": {
        "kode": "HSF1008",
        "dataUrl": "https://data.udir.no/kl06/v201906/fagkoder/HSF1008",
        "tittel": {
          "default": "Yrkesliv i helse- og oppvekstfag",
          "nob": "Yrkesliv i helse- og oppvekstfag",
          "nno": "Yrkesliv i helse- og oppvekstfag"
        },
        "kortform": {
          "default": "Yrkesliv i helse- og oppv.fag",
          "nob": "Yrkesliv i helse- og oppv.fag",
          "nno": "Yrkesliv i helse- og oppv.fag"
        }
      }
    },
    {
      "id": "7_ENG1001_TESVS@38022",
      "type": "fag",
      "name": "ENG1001_TESVS@38022",
      "groupId": "Engelsk",
      "schoolId": "TESVS@38022",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "grep": {
        "kode": "ENG1001",
        "kortform": {
          "default": "Engelsk",
          "nob": "Engelsk"
        }
      }
    },
    ...
  ],
  "count": 9
}
```
