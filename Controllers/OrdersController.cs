using BTL_SAD.Models;
using BTL_SAD.Services;
using Microsoft.AspNetCore.Mvc;

namespace BTL_SAD.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMenuService _menuService;

    public OrdersController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(OrderResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<OrderResponse> Create(OrderRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var order = _menuService.CreateOrder(request);
        return Created($"/api/orders/{order.OrderId}", order);
    }
}
