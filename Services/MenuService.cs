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
            new Dish(1, "Lemongrass Chicken Bowl", 12.50m, "Grilled dark meat chicken finished with lemongrass glaze, pickled carrots, and jasmine rice.", true, "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80"),
            new Dish(2, "Coconut Curry Shrimp", 15.75m, "Shrimp simmered in a creamy coconut curry sauce with Thai basil and snap peas.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"),
            new Dish(3, "Crispy Tofu Banh Mi", 11.25m, "Toasted baguette layered with chili aioli, pickled veggies, and five-spice tofu.", true, "https://images.unsplash.com/photo-1528832992873-5bb5781525d0?auto=format&fit=crop&w=800&q=80"),
            new Dish(4, "Garlic Butter Steak Bites", 17.90m, "Seared sirloin bites tossed in garlic herb butter, served with charred broccolini.", true, "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=800&q=80"),
            new Dish(5, "Miso Glazed Cod", 19.40m, "Oven roasted cod finished with white miso glaze and sesame bok choy.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"),
            new Dish(6, "Firecracker Cauliflower", 10.50m, "Tempura cauliflower in a spicy-sweet tamarind glaze with scallions.", true, "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80"),
            new Dish(7, "Smoked Brisket Ramen", 16.80m, "Rich chicken broth, handmade noodles, soft egg, and shaved smoked brisket.", true, "https://images.unsplash.com/photo-1528832992873-5bb5781525d0?auto=format&fit=crop&w=800&q=80"),
            new Dish(8, "Truffle Mushroom Risotto", 14.60m, "Creamy arborio rice with wild mushrooms, parmesan, and truffle oil.", false, "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80"),
            new Dish(9, "Sesame Kale Salad", 9.20m, "Shredded kale with toasted sesame dressing, citrus segments, and crispy shallots.", true, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"),
            new Dish(10, "Chili Lime Wings", 13.10m, "Double fried wings tossed in tangy chili-lime sauce with cooling yogurt dip.", true, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"),
            new Dish(11, "Pineapple Fried Rice", 12.70m, "Wok fried jasmine rice with pineapple, cashews, and turmeric curry spice.", true, "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80"),
            new Dish(12, "Spinach Feta Stuffed Chicken", 15.10m, "Roasted chicken breast stuffed with spinach, feta, and sun-dried tomatoes.", false, "https://images.unsplash.com/photo-1432138552587-ead5a4ddc41f?auto=format&fit=crop&w=800&q=80"),
            new Dish(13, "BBQ Jackfruit Sliders", 11.80m, "Slow-braised jackfruit in smoky sauce with cabbage slaw on potato rolls.", true, "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"),
            new Dish(14, "Herb Roasted Potatoes", 8.60m, "Crispy tri-color potatoes with rosemary, thyme, and charred lemon aioli.", true, "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80"),
            new Dish(15, "Chocolate Lava Cake", 8.90m, "Warm chocolate cake with molten center and espresso whipped cream.", true, "https://images.unsplash.com/photo-1505250194-9565d0b62345?auto=format&fit=crop&w=800&q=80")
        ];
    }

    public IEnumerable<MenuDishDto> GetMenuItems() => _dishes
        .Where(d => d.IsServing)
        .Select(d => new MenuDishDto(d.Id, d.Name, d.Price, d.IsServing, d.ImageUrl))
        .OrderBy(d => d.Name);

    public DishDetailDto? GetDishDetail(int id) => _dishes
        .FirstOrDefault(d => d.Id == id)
        is { } dish
            ? new DishDetailDto(dish.Id, dish.Name, dish.Price, dish.Detail, dish.IsServing, dish.ImageUrl)
            : null;

    public OrderResponse CreateOrder(OrderRequest request)
    {
        var orderId = $"ORD-{RandomNumberGenerator.GetInt32(100000, 999999)}";
        return new OrderResponse(orderId);
    }
}
