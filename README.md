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

### ```GET /classes```

Returns a list of the current users classes

[Example response](docs/getClasses.md)

### ```GET /classes/:id```

Returns the whole group object with related students and teachers

[Example response](docs/getClass.md)

### ```GET /classes/:id/students```

Returns the students that is members of the specified group

[Example response](docs/getClassStudents.md)

### ```GET /classes/:id/teachers```

Returns the teachers of the specified group

[Example response](docs/getClassTeachers.md)

### ```/documents```

Head over to [docs/documents](docs/documents.md) to read document endpoint documentation!


### ```/yff```

Head over to [docs/yff](docs/yff.md) to read YFF endpoint documentation!

## Development

Prerequisites:
- [Node.js](https://nodejs.org/) >= 12
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools)

Setup:
- clone repo
- install dependencies
- add a local `local.settings.json`

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "",
    "DEMO": false,
    "DEMO_USER": "upn@upn.no",
    "PIFU_API_URL": "https://azf-pifu-api.vtfk.no",
    "PIFU_API_JWT": "Secret that should be kept secret!",
    "MONGODB_CONNECTION": "mongodb://mongodb0.example.com:27017",
    "MONGODB_DATABASE": "minelev" ,
    "MONGODB_COLLECTION_YFF": "yff"
  }
}
```

- start dev server `$ npm run dev`

## Related

- [azf-pifu-api](https://github.com/vtfk/azf-pifu-api) - PIFU API service
- [vtfk-minelev-react](https://github.com/vtfk/vtfk-minelev-react) - MinElev frontend

## License

[MIT](LICENSE)
