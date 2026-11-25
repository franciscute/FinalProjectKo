# Customer Complaint and Network Outage Management System — API Reference

## 5. REST API Design


### 5.1 Conventions

- Base URL: http://localhost:3000/api — all bodies are JSON.
- Resource-oriented plural URIs; HTTP verbs express the action (GET read, POST create, PATCH update, DELETE remove).
- Protected routes require the header Authorization: Bearer <access_token>.
- Errors share one shape: {"statusCode": 400, "message": "...", "error": "Bad Request"}.


### 5.2 Endpoint Summary

| Method | Endpoint | JWT | Success | Purpose |
|---|---|---|---|---|
| POST | /api/auth/register | No | 201 | Register a user |
| POST | /api/auth/login | No | 200 | Log in, receive JWT |
| GET | /api/auth/me | Yes | 200 | Current user |
| GET | /api/outage-logs | Yes | 200 | List OutageLog |
| GET | /api/outage-logs/count | Yes | 200 | Count OutageLog |
| GET | /api/outage-logs/:id | Yes | 200 | Get one OutageLog |
| POST | /api/outage-logs | Yes | 201 | Create OutageLog |
| PATCH | /api/outage-logs/:id | Yes | 200 | Update OutageLog |
| DELETE | /api/outage-logs/:id | Yes | 200 | Delete OutageLog |
| GET | /api/technicians | Yes | 200 | List Technician |
| GET | /api/technicians/count | Yes | 200 | Count Technician |
| GET | /api/technicians/:id | Yes | 200 | Get one Technician |
| POST | /api/technicians | Yes | 201 | Create Technician |
| PATCH | /api/technicians/:id | Yes | 200 | Update Technician |
| DELETE | /api/technicians/:id | Yes | 200 | Delete Technician |
| GET | /api/tickets | Yes | 200 | List Ticket |
| GET | /api/tickets/count | Yes | 200 | Count Ticket |
| GET | /api/tickets/:id | Yes | 200 | Get one Ticket |
| POST | /api/tickets | Yes | 201 | Create Ticket |
| PATCH | /api/tickets/:id | Yes | 200 | Update Ticket |
| DELETE | /api/tickets/:id | Yes | 200 | Delete Ticket |
| GET | /api/ticket-updates | Yes | 200 | List TicketUpdate |
| GET | /api/ticket-updates/count | Yes | 200 | Count TicketUpdate |
| GET | /api/ticket-updates/:id | Yes | 200 | Get one TicketUpdate |
| POST | /api/ticket-updates | Yes | 201 | Create TicketUpdate |
| PATCH | /api/ticket-updates/:id | Yes | 200 | Update TicketUpdate |
| DELETE | /api/ticket-updates/:id | Yes | 200 | Delete TicketUpdate |

Total: 27 endpoints (methods used: GET, POST, PATCH, DELETE).


### 5.3 Status Codes

| Code | Meaning in this API |
|---|---|
| 200 OK | Successful read, update, delete, login. |
| 201 Created | Resource or user created. |
| 400 Bad Request | Validation failed, or a referenced foreign-key record does not exist. |
| 401 Unauthorized | Missing, invalid or expired token; wrong login credentials. |
| 404 Not Found | No record with the requested id. |
| 409 Conflict | Duplicate e-mail on register, or deleting a record that is still referenced. |


### 5.4 Authentication Endpoints


#### POST /api/auth/register  →  201 Created

```
Request
{
  "email": "demo@example.com",
  "fullName": "Demo User",
  "password": "Password123"
}

Response
{
  "id": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "role": "user"
}
```

Errors: 400 (invalid e-mail or password shorter than 8 characters), 409 (e-mail already registered).


#### POST /api/auth/login  →  200 OK

```
Request
{
  "email": "demo@example.com",
  "password": "Password123"
}

Response
{
  "access_token": "<JWT>",
  "token_type": "Bearer"
}
```

Errors: 400 (invalid input), 401 (wrong e-mail or password).


#### GET /api/auth/me  →  200 OK   (header: Authorization: Bearer <JWT>)

```
{
  "id": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "role": "user",
  "createdAt": "2026-12-01T09:00:00.000Z"
}
```

Errors: 401 (missing, invalid or expired token).


### 5.5 Resource Endpoints

All resource endpoints require the Bearer token. The examples below are the exact shapes returned by the implementation. Decimal columns are returned by MySQL as strings in read responses; relations are expanded one level in GET responses and shown as {"id": n} in create/update responses.


#### OutageLog  —  /api/outage-logs

| Field | Validation rules | DB column |
|---|---|---|
| area | required, string, not empty | Area |
| starttime | required, ISO-8601 date string | StartTime |
| endtime | optional, ISO-8601 date string | EndTime |
| status | required, string, not empty | Status |

```
POST /api/outage-logs   → 201
Request
{
  "area": "Sample Area",
  "starttime": "2026-12-01T09:00:00.000Z",
  "endtime": "2026-12-01T09:00:00.000Z",
  "status": "Sample Status"
}

Response
{
  "id": 1,
  "area": "Sample Area",
  "starttime": "2026-12-01T09:00:00.000Z",
  "endtime": "2026-12-01T09:00:00.000Z",
  "status": "Sample Status",
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/outage-logs   → 200  (array)
[
  {
    "id": 1,
    "area": "Sample Area",
    "starttime": "2026-12-01T09:00:00.000Z",
    "endtime": "2026-12-01T09:00:00.000Z",
    "status": "Sample Status",
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/outage-logs/1   → 200
Request
{
  "area": "Sample Area (Updated)"
}
```

```
DELETE /api/outage-logs/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/outage-logs/count → 200 {"total": 1}; GET/PATCH/DELETE /api/outage-logs/:id with an unknown id → 404 {"message": "OutageLog not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### Technician  —  /api/technicians

| Field | Validation rules | DB column |
|---|---|---|
| specialization | required, string, not empty | Specialization |
| availability | required, string, not empty | Availability |
| userid (→ User) | required, integer, min 1 | UserID |

```
POST /api/technicians   → 201
Request
{
  "specialization": "Sample Specialization",
  "availability": "Sample Availability",
  "userid": 1
}

Response
{
  "id": 1,
  "specialization": "Sample Specialization",
  "availability": "Sample Availability",
  "user": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/technicians   → 200  (array)
[
  {
    "id": 1,
    "specialization": "Sample Specialization",
    "availability": "Sample Availability",
    "user": {
      "id": 1,
      "fullName": "Demo User",
      "email": "demo@example.com",
      "role": "user",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/technicians/1   → 200
Request
{
  "specialization": "Sample Specialization (Updated)"
}
```

```
DELETE /api/technicians/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/technicians/count → 200 {"total": 1}; GET/PATCH/DELETE /api/technicians/:id with an unknown id → 404 {"message": "Technician not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### Ticket  —  /api/tickets

| Field | Validation rules | DB column |
|---|---|---|
| issuetype | required, string, not empty | IssueType |
| description | required, string, not empty | Description |
| status | required, string, not empty | Status |
| reportedat | optional, ISO-8601 date string | ReportedAt |
| userid (→ User) | required, integer, min 1 | UserID |
| technicianid (→ Technician) | required, integer, min 1 | TechnicianID |
| outageid (→ OutageLog) | required, integer, min 1 | OutageID |

```
POST /api/tickets   → 201
Request
{
  "issuetype": "Sample IssueType",
  "description": "Sample Description",
  "status": "Sample Status",
  "reportedat": "2026-12-01T09:00:00.000Z",
  "userid": 1,
  "technicianid": 1,
  "outageid": 1
}

Response
{
  "id": 1,
  "issuetype": "Sample IssueType",
  "description": "Sample Description",
  "status": "Sample Status",
  "reportedat": "2026-12-01T09:00:00.000Z",
  "user": {
    "id": 1
  },
  "technician": {
    "id": 1
  },
  "outagelog": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/tickets   → 200  (array)
[
  {
    "id": 1,
    "issuetype": "Sample IssueType",
    "description": "Sample Description",
    "status": "Sample Status",
    "reportedat": "2026-12-01T09:00:00.000Z",
    "user": {
      "id": 1,
      "fullName": "Demo User",
      "email": "demo@example.com",
      "role": "user",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "technician": {
      "id": 1,
      "specialization": "Sample Specialization",
      "availability": "Sample Availability",
      "user": {
        "id": 1,
        "fullName": "Demo User",
        "email": "demo@example.com",
        "role": "user",
        "createdAt": "2026-12-01T09:00:00.000Z",
        "updatedAt": "2026-12-01T09:00:00.000Z"
      },
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "outagelog": {
      "id": 1,
      "area": "Sample Area",
      "starttime": "2026-12-01T09:00:00.000Z",
      "endtime": "2026-12-01T09:00:00.000Z",
      "status": "Sample Status",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/tickets/1   → 200
Request
{
  "issuetype": "Sample IssueType (Updated)"
}
```

```
DELETE /api/tickets/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/tickets/count → 200 {"total": 1}; GET/PATCH/DELETE /api/tickets/:id with an unknown id → 404 {"message": "Ticket not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### TicketUpdate  —  /api/ticket-updates

| Field | Validation rules | DB column |
|---|---|---|
| remarks | required, string, not empty | Remarks |
| loggedat | optional, ISO-8601 date string | LoggedAt |
| ticketid (→ Ticket) | required, integer, min 1 | TicketID |
| userid (→ User) | required, integer, min 1 | UserID |

```
POST /api/ticket-updates   → 201
Request
{
  "remarks": "Sample Remarks",
  "loggedat": "2026-12-01T09:00:00.000Z",
  "ticketid": 1,
  "userid": 1
}

Response
{
  "id": 1,
  "remarks": "Sample Remarks",
  "loggedat": "2026-12-01T09:00:00.000Z",
  "ticket": {
    "id": 1
  },
  "user": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/ticket-updates   → 200  (array)
[
  {
    "id": 1,
    "remarks": "Sample Remarks",
    "loggedat": "2026-12-01T09:00:00.000Z",
    "ticket": {
      "id": 1,
      "issuetype": "Sample IssueType",
      "description": "Sample Description",
      "status": "Sample Status",
      "reportedat": "2026-12-01T09:00:00.000Z",
      "user": {
        "id": 1,
        "fullName": "Demo User",
        "email": "demo@example.com",
        "role": "user",
        "createdAt": "2026-12-01T09:00:00.000Z",
        "updatedAt": "2026-12-01T09:00:00.000Z"
      },
      "technician": {
        "id": 1,
        "specialization": "Sample Specialization",
        "availability": "Sample Availability",
        "user": {
          "id": 1,
          "fullName": "Demo User",
          "email": "demo@example.com",
          "role": "user",
          "createdAt": "2026-12-01T09:00:00.000Z",
          "updatedAt": "2026-12-01T09:00:00.000Z"
        },
        "createdAt": "2026-12-01T09:00:00.000Z",
        "updatedAt": "2026-12-01T09:00:00.000Z"
      },
      "outagelog": {
        "id": 1,
        "area": "Sample Area",
        "starttime": "2026-12-01T09:00:00.000Z",
        "endtime": "2026-12-01T09:00:00.000Z",
        "status": "Sample Status",
        "createdAt": "2026-12-01T09:00:00.000Z",
        "updatedAt": "2026-12-01T09:00:00.000Z"
      },
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "user": {
      "id": 1,
      "fullName": "Demo User",
      "email": "demo@example.com",
      "role": "user",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/ticket-updates/1   → 200
Request
{
  "remarks": "Sample Remarks (Updated)"
}
```

```
DELETE /api/ticket-updates/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/ticket-updates/count → 200 {"total": 1}; GET/PATCH/DELETE /api/ticket-updates/:id with an unknown id → 404 {"message": "TicketUpdate not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.
