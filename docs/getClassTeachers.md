[🔙 ](https://github.com/vtfk/minelev-api#get-classesidteachers)

### ```GET /classes/:id/teachers```

Returns all the teachers of a specific class

> #### Please note
> * The ID url property should be double URL Encoded

<br />

Example response:

```JSON
{
  "data": [
    {
      "id": "tes0101",
      "username": "tes0101",
      "fullName": "Testine Testen",
      "firstName": "Testine",
      "lastName": "Testen",
      "mail": "testine.testen@vtfk.no",
      "mobile": 4748484848
    }
  ],
  "count": 1
}```
