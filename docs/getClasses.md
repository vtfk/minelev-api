[🔙 ](https://github.com/vtfk/minelev-api#get-classes)

### ```GET /classes```

Returns an array of current users classes

Example response:

```JSON
{
  "data": [
    {
      "id": "1_TEST_TESVS@38099",
      "type": "basisgruppe",
      "name": "TEST",
      "groupId": "TESVS:TEST",
      "schoolId": "TESVS@38099",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs"
    },
    {
      "id": "2_TEST/201NOR1202_TESVS@38099",
      "type": "undervisningsgruppe",
      "name": "TEST/201NOR1202",
      "groupId": "TESVS:TEST/201NOR1202",
      "schoolId": "TESVS@38099",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "grep": {
        "kode": "TEST/201NOR1202",
        "kortform": {
          "default": "Undervisningsgruppa TEST/201NOR1202 i Norsk sidemål, skriftlig ved Testen videregående skole",
          "nob": "Undervisningsgruppa TEST/201NOR1202 i Norsk sidemål, skriftlig ved Testen videregående skole"
        }
      }
    },
    {
      "id": "2_TEST/201NOR1208_TESVS@38099",
      "type": "undervisningsgruppe",
      "name": "TEST/201NOR1208",
      "groupId": "TESVS:TEST/201NOR1208",
      "schoolId": "TESVS@38099",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "grep": {
        "kode": "NOR1208",
        "dataUrl": "https://data.udir.no/kl06/v201906/fagkoder/NOR1208",
        "tittel": {
          "default": "Norsk hovedmål, Vg2 studieforberedende utdanningsprogram, skriftlig",
          "nob": "Norsk hovedmål, Vg2 studieforberedende utdanningsprogram, skriftlig",
          "nno": "Norsk hovudmål, Vg2 studieførebuande utdanningsprogram, skriftleg"
        },
        "kortform": {
          "default": "Norsk hovedmål, skriftlig",
          "nob": "Norsk hovedmål, skriftlig",
          "nno": "Norsk hovudmål, skriftleg"
        }
      }
    }
  ],
  "count": 4
}```
