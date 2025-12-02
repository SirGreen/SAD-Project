# BTL-SAD MVP1

Minimal ASP.NET Core MVC app that fronts mock menu and ordering endpoints for early validation.

## Getting Started

```powershell
cd d:\Code\BKU\BTL-SAD
dotnet run
```

Use `--urls http://localhost:5153` to pin a port if needed.

## Hardcoded Data

Fifteen dishes are defined in `Services/MenuService.cs`, each with name, price, detail, `isServing`, and an `imageUrl` you can display in UI mockups. Only dishes that are currently serving appear in the menu response.

## HTTP Endpoints (MVC Controllers)

- `GET /api/dishes` – Returns lightweight menu entries `{ id, name, price, isServing, imageUrl }` surfaced by `DishesController`.
- `GET /api/dishes/{id}` – Returns the full dish detail payload, including the hero `imageUrl`.
- `POST /api/orders` – Accepts `{ "dishIds": [1,2], "customerName": "Ada", "note": "extra sauce" }` and responds with `201 Created`, location `/api/orders/ORD-123456`, and body `{ "orderId": "ORD-123456" }`. Orders are not persisted; IDs are random.

Browse to `/swagger` to explore every controller action, or open `/` to see the lightweight MVC dashboard that links to the API surface.

## Next Steps

- Wire the endpoints to a persistent store when available.
- Replace the random order ID generator with the real ordering workflow.
