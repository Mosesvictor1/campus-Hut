# News, Advertisers, and Ad Campaign API Responses

This document records the response structures used by the frontend for News,
Advertisers, and Ad Campaigns.

## Capture notes

- Read-only responses were inspected on 2026-11-08. Examples below show field
  names and types only; no record data is included.
- Mutating endpoints (create, update, delete, deactivate, lifecycle actions, and
  click tracking) were not called. Their exact success bodies are therefore
  **unverified**; the response-handler behavior is documented where known.
- The frontend builds URLs from `VITE_NEWS_BASE_URL`, falling back to
  `/news-proxy`. The paths below are relative to that base.
- Optional fields and nullability can vary between records. The structures
  reflect responses observed during capture, not a versioned backend schema.

## Shared response handling

Most News and advertising requests use `newsRequest` in `src/lib/api.ts`.
`POST /api/news/createNews` and campaign creation perform their own response
parsing.

- HTTP errors reject with `API error: <status>`.
- HTTP `204`, an empty body, or a zero `content-length` resolves to `null`.
- A non-JSON, non-empty body is returned as text.
- JSON responses with a top-level status outside the recognized successful
  values (`2xx`, `0`, `OK`, `SUCCESS`, `CREATED`, etc.) reject using a message
  found in `Message`, `message`, `error`, or `detail` (including under `body`).
- A response without a recognized status field is treated as successful by the
  client.

## News

News endpoints use `/api/news`.

### `GET /api/news/getAllNews?page={page}&size={size}`

**Observed:** `200 OK`, a direct JSON array; no pagination envelope was present
in the captured response.

```json
[
  {
    "id": "number",
    "title": "string",
    "newsType": "string",
    "summary": "string",
    "content": "string",
    "author": "string",
    "imageUrl": "string"
  }
]
```

### `GET /api/news/getNews/{id}`

**Observed:** `200 OK`, a single news object (not wrapped in `data`).

```json
{
  "id": "number",
  "title": "string",
  "newsType": "string",
  "summary": "string",
  "content": "string",
  "author": "string",
  "imageUrl": "string"
}
```

### `GET /api/news/search/{field}?{field}={query}`

`{field}` is `title`, `author`, or `type`. The query parameter name matches the
field path. For example: `/api/news/search/title?title=campus`.

**Observed:** matching title and author searches return `200 OK` with a direct
array of news objects. The captured search objects included `id`, `title`,
`newsType`, `summary`, `content`, and `author`; `imageUrl` was not present in
those search samples. A no-match result returned `204 No Content`. A matching
`type` search response was not observed.

```json
[
  {
    "id": "number",
    "title": "string",
    "newsType": "string",
    "summary": "string",
    "content": "string",
    "author": "string"
  }
]
```

### `POST /api/news/createNews`

**Request:** `multipart/form-data`; `news` contains the JSON article
(`title`, `author`, `newsType`, `summary`, `content`) and optional `images`
contains the image file.

**Response:** success body not captured; this is a write endpoint and was not
called during schema inspection.

### `PUT /api/news/updateNews/{id}`

**Request:** JSON with `newsType`, `summary`, and `content`, or multipart form
data with a `news` JSON part and optional `images` file.

**Response:** success body not captured.

### `DELETE /api/news/deleteNews/{id}`

**Response:** success body not captured. The client also supports a `204 No
Content` response, which resolves to `null`.

## Advertisers

### `GET /api/getAllAdvertiser`

**Observed:** `200 OK`; advertiser records are nested under
`Advertiser.advertisers`.

```json
{
  "Status": "string",
  "Message": "string",
  "Advertiser": {
    "advertisers": [
      {
        "id": "number",
        "companyName": "string",
        "contactName": "string",
        "logoURL": "string | null",
        "email": "string",
        "phone": "string",
        "active": "boolean"
      }
    ]
  }
}
```

### `GET /api/getAdvertiser/{id}`

**Observed:** `200 OK`; a single record is nested under
`Advertiser.advertiser`.

```json
{
  "Status": "string",
  "Message": "string",
  "Advertiser": {
    "advertiser": {
      "id": "number",
      "companyName": "string",
      "contactName": "string",
      "logoURL": "string | null",
      "email": "string",
      "phone": "string",
      "active": "boolean"
    }
  }
}
```

### `POST /api/createAdvertiser?request={encoded-json}`

### `POST /api/updateAdvertiser/{id}?request={encoded-json}`

**Request:** advertiser JSON contains `companyName`, `contactName`, `email`,
and `phone`. The frontend sends multipart form data with a `request` JSON part;
when an image is selected it also sends the file under `images`, `logo`, and
`file`.

**Response:** success bodies not captured.

### `PATCH /api/{id}/deactivate`

**Response:** success body not captured. The exact path is retained as used by
the frontend.

## Ad campaigns

### Campaign record

The following record fields were observed in the admin list, detail, and active
campaign responses:

```json
{
  "id": "number",
  "advertiserId": "number",
  "advertiserName": "string",
  "title": "string",
  "description": "string",
  "bannerUrl": "string",
  "ctaText": "string",
  "ctaUrl": "string",
  "placement": "string",
  "priority": "string",
  "status": "string",
  "startDate": "string",
  "endDate": "string",
  "maxImpressions": "number",
  "currentImpressions": "number",
  "currentClicks": "number"
}
```

### `GET /api/ad-campaigns/getAdminAllCampaign`

**Observed:** `200 OK`; campaign records are in the top-level `campaigns`
array.

```json
{
  "Status": "number",
  "campaigns": [
    {
      "id": "number",
      "advertiserId": "number",
      "advertiserName": "string",
      "title": "string",
      "description": "string",
      "bannerUrl": "string",
      "ctaText": "string",
      "ctaUrl": "string",
      "placement": "string",
      "priority": "string",
      "status": "string",
      "startDate": "string",
      "endDate": "string",
      "maxImpressions": "number",
      "currentImpressions": "number",
      "currentClicks": "number"
    }
  ],
  "Message": "string"
}
```

### `GET /api/ad-campaigns/getCampaign/{id}`

**Observed:** `200 OK`; a single campaign is in `campaign`.

```json
{
  "Status": "number",
  "Message": "string",
  "campaign": {
    "id": "number",
    "advertiserId": "number",
    "advertiserName": "string",
    "title": "string",
    "description": "string",
    "bannerUrl": "string",
    "ctaText": "string",
    "ctaUrl": "string",
    "placement": "string",
    "priority": "string",
    "status": "string",
    "startDate": "string",
    "endDate": "string",
    "maxImpressions": "number",
    "currentImpressions": "number",
    "currentClicks": "number"
  }
}
```

### `GET /api/ad-campaigns/active[?placement={placement}]`

The frontend helper makes `placement` optional, but the live endpoint returned
`400 Bad Request` when it was omitted. Supplying a valid placement returned
`200 OK`.

**Observed:** `200 OK`; active campaigns are returned in the top-level
`campaigns` array.

```json
{
  "Status": "number",
  "campaigns": [
    {
      "id": "number",
      "advertiserId": "number",
      "advertiserName": "string",
      "title": "string",
      "description": "string",
      "bannerUrl": "string",
      "ctaText": "string",
      "ctaUrl": "string",
      "placement": "string",
      "priority": "string",
      "status": "string",
      "startDate": "string",
      "endDate": "string",
      "maxImpressions": "number",
      "currentImpressions": "number",
      "currentClicks": "number"
    }
  ],
  "Message": "string"
}
```

**Observed error without placement:** a JSON problem response with `title`,
numeric `status`, `detail`, and `instance` fields.

### `GET /api/ad-campaigns/dashboard`

**Observed:** `200 OK`.

```json
{
  "Status": "number",
  "Message": "string",
  "dashboard": {
    "totalAdvertisers": "number",
    "activeAdvertisers": "number",
    "totalCampaigns": "number",
    "pendingCampaigns": "number",
    "activeCampaigns": "number",
    "pausedCampaigns": "number",
    "completedCampaigns": "number",
    "totalImpressions": "number",
    "totalClicks": "number",
    "overallCtr": "number"
  }
}
```

### `GET /api/ad-campaigns/placements`

**Observed:** `200 OK`; `placements` is an array of strings.

```json
{
  "Status": "number",
  "Message": "string",
  "placements": ["string"]
}
```

### `GET /api/ad-campaigns/priorities`

**Observed:** `200 OK`; `priorities` contains objects with a name and numeric
weight.

```json
{
  "Status": "number",
  "priorities": [
    {
      "name": "string",
      "weight": "number"
    }
  ],
  "Message": "string"
}
```

### `GET /api/ad-campaigns/{id}/campaignAnalytics`

**Observed:** `200 OK`.

```json
{
  "analytics": {
    "campaignId": "number",
    "campaignTitle": "string",
    "advertiserName": "string",
    "status": "string",
    "impressions": "number",
    "clicks": "number",
    "ctr": "number",
    "maxImpressions": "number",
    "remainingImpressions": "number",
    "startDate": "string",
    "endDate": "string"
  },
  "Status": "number",
  "Message": "string"
}
```

### `POST /api/ad-campaigns/createCampaign?request={encoded-json}`

### `POST /api/ad-campaigns/updateCampaign?campaignId={id}&id={id}&request={encoded-json}`

**Request:** campaign JSON contains `advertiserId`, `title`, `description`,
`ctaText`, `ctaUrl`, `placement`, `priority`, `startDate`, `endDate`, and
`maxImpressions`. Create uses `advertiserId` as a number. Update also sends
`id` and `campaignId` in its JSON payload. The image is optional: create sends
it as `images`; update sends multipart fields `request`, `banner`, `images`,
and `file`. Without an image, update sends JSON.

**Response:** success bodies not captured.

### `PATCH /api/ad-campaigns/{id}/{action}`

The UI uses `approve`, `pause`, `resume`, `complete`, and `archive`.

**Response:** success bodies not captured.

### `POST /api/ad-campaigns/{id}/click`

**Request:** a caller-provided JSON payload.

**Response:** success body not captured.

## Frontend source

- `src/lib/api.ts` defines the request helpers and campaign endpoints.
- `src/pages/admin/NewsList.tsx` and `src/pages/admin/NewsEditor.tsx` use News
  endpoints.
- `src/pages/admin/Advertisers.tsx` and `src/pages/admin/AdvertiserEditor.tsx`
  use Advertiser endpoints.
- `src/pages/admin/Campaigns.tsx` and `src/pages/admin/CampaignEditor.tsx` use
  campaign endpoints.
