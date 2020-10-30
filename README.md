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

Environment

```env
PAPERTRAIL_HOST=example.papertrailapp.com
PAPERTRAIL_PORT=port
PAPERTRAIL_HOSTNAME=minelev-api
PIFU_API_URL=azf-pifu-api.no
PIFU_API_JWT=jwt secret that should be kept secret!
```

## Related

- [azf-pifu-api](https://github.com/vtfk/azf-pifu-api) - PIFU API service

## License

[MIT](LICENSE)
