# minelev-api

[![Build Status](https://travis-ci.com/vtfk/minelev-api.svg?branch=master)](https://travis-ci.com/vtfk/minelev-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Azure functions API for suppling minelev-web with data!

## API

All calls requires a valid bearer token from Azure

### ```GET /students```

Returns an array of current users students.

[Example response](docs/getStudents.md)

### ```GET /students/:id```

Returns an object of given student with available documents

[Example response](docs/getStudent.md)

### ```GET /students/:id/classes```

Returns a list of given students classes

[Example response](docs/getStudentClasses.md)

## Setup

local.settings.json

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "",
    "DEMO": false,
    "DEMO_USER": "upn@upn.no",
    "PIFU_API_URL": "https://azf-pifu-api.vtfk.no",
    "PIFU_API_JWT": "Secret that should be kept secret!"
  }
}
```

## Related

- [azf-pifu-api](https://github.com/vtfk/azf-pifu-api) - PIFU API service

## License

[MIT](LICENSE)
