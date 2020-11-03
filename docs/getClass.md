[🔙 ](https://github.com/vtfk/minelev-api#get-classesid)

### ```GET /classes/:id```

Returns a specific class with students and teachers

> #### Please note
> * The ID url property should be URL Encoded
> * The grep property isn't always filled up properly (when the class wasn't found in UDIR's GREP API). Underneath is a least filled object for reference. A properly filled object can be found in the example at [/classes](https://github.com/vtfk/minelev-api#get-classes). Read more about the GREP property [here](./grep.md)

<br />

Example response:

```JSON
{
  "data": [
    {
      "id": "2_TEST/201NOR1208_TESVS@38099",
      "type": "undervisningsgruppe",
      "name": "TEST/201NOR1208",
      "groupId": "TESVS:TEST/201NOR1208",
      "schoolId": "TESVS@38099",
      "schoolName": "Testen videregående skole",
      "schoolShortName": "Testen vgs",
      "students": [
        {
          "id": "bra2001",
          "firstName": "Brage",
          "lastName": "Dahl",
          "fullName": "Brage Dahl",
          "birthdate": "2009-01-20T00:00:00.000Z",
          "username": "bra2001",
          "mail": "bra2001@skole.vtfk.no",
          "mobile": "",
          "schoolId": "TESVS",
          "schoolName": "Testen videregående skole",
          "schoolShortName": "Testen vgs",
          "classId": "TESVS:TEST",
          "classShortId": "TEST"
        },
        [...]
      ],
      "teachers": [
        {
          "id": "tes0101",
          "fullName": "Testine Testen",
          "username": "tes0101",
          "mail": "testine.testen@vtfk.no",
          "mobile": 4747474747
        }
      ],
      "grep": {
        "kode": "TEST/201NOR1203",
        "kortform": {
          "default": "Undervisningsgruppa TEST/201NOR1203 i Norsk, muntlig ved Kragerø videregående skole",
          "nob": "Undervisningsgruppa TEST/201NOR1203 i Norsk, muntlig ved Kragerø videregående skole"
        }
      }
    }
  ],
  "count": 1
}
```
