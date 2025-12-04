using System.Security.Cryptography;
using BTL_SAD.Models;

namespace BTL_SAD.Services;

public interface IMenuService
{
    IEnumerable<MenuDishDto> GetMenuItems();
    DishDetailDto? GetDishDetail(int id);
    OrderResponse CreateOrder(OrderRequest request);
}

public class MenuService : IMenuService
{
    private readonly List<Dish> _dishes;

    public MenuService()
    {
        _dishes =
        [
            new Dish(1, "Lemongrass Chicken Bowl", 12.50m, "Grilled dark meat chicken finished with lemongrass glaze, pickled carrots, and jasmine rice. Contains fish sauce and soy.", true, "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80", "Bowls"),
            new Dish(2, "Coconut Curry Shrimp", 15.75m, "Shrimp simmered in a creamy coconut curry sauce with Thai basil and snap peas. Contains shellfish and coconut.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Seafood"),
            new Dish(3, "Crispy Tofu Banh Mi", 11.25m, "Toasted baguette layered with chili aioli, pickled veggies, and five-spice tofu. Contains wheat and soy.", true, "https://images.unsplash.com/photo-1528832992873-5bb5781525d0?auto=format&fit=crop&w=800&q=80", "Sandwiches"),
            new Dish(4, "Garlic Butter Steak Bites", 17.90m, "Seared sirloin bites tossed in garlic herb butter, served with charred broccolini. Contains dairy.", true, "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=800&q=80", "Beef"),
            new Dish(5, "Miso Glazed Cod", 19.40m, "Oven roasted cod finished with white miso glaze and sesame bok choy. Contains fish and soy.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Seafood"),
            new Dish(6, "Firecracker Cauliflower", 10.50m, "Tempura cauliflower in a spicy-sweet tamarind glaze with scallions. Contains gluten and sesame.", true, "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80", "Vegetarian"),
            new Dish(7, "Smoked Brisket Ramen", 16.80m, "Rich chicken broth, handmade noodles, soft egg, and shaved smoked brisket. Contains egg and wheat.", true, "https://images.unsplash.com/photo-1528832992873-5bb5781525d0?auto=format&fit=crop&w=800&q=80", "Noodles"),
            new Dish(8, "Truffle Mushroom Risotto", 14.60m, "Creamy arborio rice with wild mushrooms, parmesan, and truffle oil. Contains dairy.", false, "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", "Pasta"),
            new Dish(9, "Sesame Kale Salad", 9.20m, "Shredded kale with toasted sesame dressing, citrus segments, and crispy shallots. Contains sesame seeds.", true, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", "Salads"),
            new Dish(10, "Chili Lime Wings", 13.10m, "Double fried wings tossed in tangy chili-lime sauce with cooling yogurt dip. Contains dairy.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Small Plates"),
            new Dish(11, "Pineapple Fried Rice", 12.70m, "Wok fried jasmine rice with pineapple, cashews, and turmeric curry spice. Contains tree nuts and egg.", true, "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80", "Rice"),
            new Dish(12, "Spinach Feta Stuffed Chicken", 15.10m, "Roasted chicken breast stuffed with spinach, feta, and sun-dried tomatoes. Contains dairy.", false, "https://images.unsplash.com/photo-1432138552587-ead5a4ddc41f?auto=format&fit=crop&w=800&q=80", "Poultry"),
            new Dish(13, "BBQ Jackfruit Sliders", 11.80m, "Slow-braised jackfruit in smoky sauce with cabbage slaw on potato rolls. Contains gluten.", true, "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80", "Plant-Based"),
            new Dish(14, "Herb Roasted Potatoes", 8.60m, "Crispy tri-color potatoes with rosemary, thyme, and charred lemon aioli. Contains egg.", true, "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80", "Sides"),
            new Dish(15, "Chocolate Lava Cake", 8.90m, "Warm chocolate cake with molten center and espresso whipped cream. Contains eggs and dairy.", true, "https://images.unsplash.com/photo-1505250194-9565d0b62345?auto=format&fit=crop&w=800&q=80", "Desserts"),
            new Dish(16, "Charred Corn Elote Cups", 9.80m, "Sweet corn roasted with ancho chili butter, cotija, and lime crema served in mini cups. Contains dairy.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Small Plates"),
            new Dish(17, "Turmeric Ginger Broth Bowl", 13.40m, "Golden coconut broth poured over brown rice, blistered tomatoes, and grilled tofu. Contains coconut and soy.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Bowls"),
            new Dish(18, "Seared Scallop Soba", 18.60m, "Butter-seared scallops over chilled soba noodles with yuzu ponzu and daikon. Contains shellfish and wheat.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Seafood"),
            new Dish(19, "Citrus Herb Salmon", 17.20m, "Roasted salmon with grapefruit beurre blanc, fennel, and charred broccolini. Contains fish and dairy.", true, "https://images.unsplash.com/photo-1514516430036-1404e0a1ff14?auto=format&fit=crop&w=800&q=80", "Seafood"),
            new Dish(20, "Roasted Beet Carpaccio", 10.30m, "Paper-thin beets with whipped goat cheese, pistachio dust, and sorrel. Contains dairy and tree nuts.", true, "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", "Salads"),
            new Dish(21, "Thai Basil Beef Lettuce Wraps", 12.90m, "Caramelized beef with Thai basil, pickled chilies, and gem lettuce boats. Contains soy and fish sauce.", true, "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80", "Beef"),
            new Dish(22, "Kimchi Grilled Cheese", 11.10m, "Toasted sourdough with aged cheddar, gochujang butter, and kimchi relish. Contains dairy and gluten.", true, "https://images.unsplash.com/photo-1528832992873-5bb5781525d0?auto=format&fit=crop&w=800&q=80", "Sandwiches"),
            new Dish(23, "Pesto Burrata Flatbread", 13.50m, "Stone-fired flatbread with basil pesto, burrata, and blistered cherry tomatoes. Contains dairy and pine nuts.", false, "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80", "Small Plates"),
            new Dish(24, "Wild Mushroom Pho", 14.20m, "Star anise broth with rice noodles, seared mushrooms, and crispy shallots. Contains soy.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Noodles"),
            new Dish(25, "Gochujang Honey Meatballs", 13.80m, "Glazed beef and pork meatballs with sesame crumble and pickled cucumber. Contains sesame and soy.", true, "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80", "Small Plates"),
            new Dish(26, "Moroccan Chickpea Tagine", 12.10m, "Slow-braised chickpeas, apricots, and preserved lemon over saffron couscous. Contains tree nuts (almonds).", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Plant-Based"),
            new Dish(27, "Harissa Lamb Chops", 21.50m, "Grilled lamb chops brushed with harissa, mint yogurt, and charred onions. Contains dairy.", true, "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", "Lamb"),
            new Dish(28, "Pumpkin Sage Gnocchi", 15.40m, "Handmade gnocchi tossed in brown butter, roasted pumpkin, and crispy sage. Contains gluten and dairy.", false, "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", "Pasta"),
            new Dish(29, "Green Papaya Salad", 9.60m, "Shredded papaya with lime fish sauce, peanuts, and bird's eye chilies. Contains fish sauce and peanuts.", true, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", "Salads"),
            new Dish(30, "Charcoal Char Siu Pork", 18.10m, "Charcoal-roasted pork shoulder lacquered with soy-malt syrup and pickled mustard greens. Contains soy and wheat.", true, "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80", "Pork"),
            new Dish(31, "Spicy Tuna Poke Stack", 16.30m, "Ahi tuna with chili mayo, avocado, and crispy rice cakes. Contains fish, soy, and sesame.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Seafood"),
            new Dish(32, "Matcha Panna Cotta", 8.70m, "Silky matcha panna cotta with black sesame crumble and yuzu gel. Contains dairy and sesame.", false, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Desserts"),
            new Dish(33, "Salted Caramel Tres Leches", 8.95m, "Vanilla sponge soaked in three milks with burnt caramel and cocoa nibs. Contains dairy and egg.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "Desserts"),
            new Dish(34, "Roasted Garlic Focaccia", 7.80m, "Focaccia baked with confit garlic, rosemary, and sea salt. Contains gluten.", true, "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80", "Sides"),
            new Dish(35, "Black Garlic Umami Fries", 9.00m, "Crispy fries tossed in black garlic butter, parmesan, and herbs. Contains dairy.", true, "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80", "Sides")
        ];
    }

    public IEnumerable<MenuDishDto> GetMenuItems() => _dishes
        .Where(d => d.IsServing)
        .Select(d => new MenuDishDto(d.Id, d.Name, d.Price, d.IsServing, d.ImageUrl, d.Category))
        .OrderBy(d => d.Name);

    public DishDetailDto? GetDishDetail(int id) => _dishes
        .FirstOrDefault(d => d.Id == id)
        is { } dish
            ? new DishDetailDto(dish.Id, dish.Name, dish.Price, dish.Detail, dish.IsServing, dish.ImageUrl, dish.Category)
            : null;

    public OrderResponse CreateOrder(OrderRequest request)
    {
        var orderId = $"ORD-{RandomNumberGenerator.GetInt32(100000, 999999)}";
        return new OrderResponse(orderId);
    }
}
