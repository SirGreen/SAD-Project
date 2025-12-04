namespace BTL_SAD.Models;

public record Dish(int Id, string Name, decimal Price, string Detail, bool IsServing, string ImageUrl, string Category);

public record MenuDishDto(int Id, string Name, decimal Price, bool IsServing, string ImageUrl, string Category);

public record DishDetailDto(int Id, string Name, decimal Price, string Detail, bool IsServing, string ImageUrl, string Category);
