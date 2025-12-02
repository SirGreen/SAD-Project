using BTL_SAD.Models;
using BTL_SAD.Services;
using Microsoft.AspNetCore.Mvc;

namespace BTL_SAD.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DishesController : ControllerBase
{
    private readonly IMenuService _menuService;

    public DishesController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<MenuDishDto>> Get()
    {
        return Ok(_menuService.GetMenuItems());
    }

    [HttpGet("{id:int}")]
    public ActionResult<DishDetailDto> Get(int id)
    {
        var dish = _menuService.GetDishDetail(id);
        return dish is null ? NotFound() : Ok(dish);
    }
}
