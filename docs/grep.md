[🔙 ](https://github.com/vtfk/minelev-api)

### GREP property

Some object types like ``undervisningsgruppe`` and ``utdanningsprogram`` have a ``grep`` property with different kind of values.

Because our SAS isn't directly linked to the [GREP API from UDIR](https://data.udir.no/kl06), the structure and values of this object can differ based on the data we get from UDIR.

The actuall loading of the GREP data is done in the [pifu-converter](https://github.com/telemark/minelev-pifu-tools), and stored with the objects in the database.

#### The differences

When the code (`kode`) or UUID isn't matched with any grep object, we create our own object with the data we have available in the PIFU object.
The names and description in this object is primarily used to create the object (in _nob_).

Here are examples of ``grep`` properties that is _hand crafted_:

##### Example 1 (undervisningsgruppe):

```json
"grep": {
  "kode": "TEST/201FSP5091",
  "kortform": {
    "default": "Spansk I, 1. år ",
    "nob": "Spansk I, 1. år"
  }
}
```

##### Example 2 (utdanningsprogram):

```json
"utdanningsprogram": {
  "kode": "ST",
  "type": "Ukjent",
  "kortform": {
    "default": "Studiespesialisering",
    "nob": "Studiespesialisering"
  }
}
```

Here follow some examples of correct objects (with GREP data):

##### Example 1 (undervisningsprogram):

```json
"grep": {
  "kode": "ENG1009",
  "dataUrl": "https://data.udir.no/kl06/v201906/fagkoder/ENG1009",
  "tittel": {
    "default": "Engelsk Vg1 yrkesfaglige utdanningsprogram",
    "nob": "Engelsk Vg1 yrkesfaglige utdanningsprogram",
    "nno": "Engelsk, Vg1 yrkesfaglege utdanningprogram"
  },
  "kortform": {
    "default": "Engelsk",
    "nob": "Engelsk",
    "nno": "Engelsk"
  }
}
```

##### Example 2 (utdanningsprogram):

```json
"utdanningsprogram": {
  "kode": "HS",
  "type": "yrkesfaglig",
  "tittel": {
    "default": "Helse- og oppvekstfag",
    "nob": "Helse- og oppvekstfag",
    "nno": "Helse- og oppvekstfag"
  },
  "kortform": {
    "default": "Helse- og oppvekstfag",
    "nob": "Helse- og oppvekstfag",
    "nno": "Helse- og oppvekstfag"
  }
}
```
