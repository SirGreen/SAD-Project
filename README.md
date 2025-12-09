# BTL-SAD MVP1

Minimal ASP.NET Core MVC app that fronts mock menu and ordering endpoints for early validation.

## Getting Started

```powershell
cd d:\Code\BKU\BTL-SAD
npm run build   # (Build step)
npm run start   # (Run step)
```

By default:
Backend runs on http://localhost:5153
Frontend (React) runs on http://localhost:3000

Use `--urls http://localhost:5153` to pin a port if needed.

## Hardcoded Data

Thirty-five dishes are defined in `Services/MenuService.cs`, each with name, price, detail, `isServing`, `imageUrl`, and a `category` string that lets the UI group dishes when rendering the live menu. Descriptions now call out common allergens (e.g., dairy, nuts, shellfish) so the UI can surface warnings directly from the API. Only dishes that are currently serving appear in the menu response, but categories repeat so views can cluster similar plates (e.g., several Seafood items, multiple Sides, etc.).

## HTTP Endpoints (MVC Controllers)

- `GET /api/dishes` – Returns lightweight menu entries `{ id, name, price, isServing, imageUrl, category }` surfaced by `DishesController`.
- `GET /api/dishes/{id}` – Returns the full dish detail payload, including the hero `imageUrl` and classification `category`.
- `POST /api/orders` – Accepts `{ "dishIds": [1,2], "customerName": "Ada", "note": "extra sauce" }` and responds with `201 Created`, location `/api/orders/ORD-123456`, and body `{ "orderId": "ORD-123456" }`. Orders are not persisted; IDs are random.

Browse to `/swagger` to explore every controller action, or open `/` to see the lightweight MVC dashboard that links to the API surface.

## Next Steps

- Wire the endpoints to a persistent store when available.
- Replace the random order ID generator with the real ordering workflow.
