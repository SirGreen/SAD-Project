using System.ComponentModel.DataAnnotations;

namespace BTL_SAD.Models;

public class OrderRequest
{
    [Required]
    [MinLength(1, ErrorMessage = "Provide at least one dish.")]
    public List<int> DishIds { get; init; } = [];

    [Required]
    [StringLength(120)]
    public string CustomerName { get; init; } = string.Empty;

    [StringLength(250)]
    public string? Note { get; init; }
}

public record OrderResponse(string OrderId);
