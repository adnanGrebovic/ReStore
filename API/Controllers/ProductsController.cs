using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreContext _context;
         public ProductsController(StoreContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();         
        
        
        }
        
         [HttpGet("{id}")]
        public ActionResult<Product>GetProduct(int id) 
        { 
            var dbProducts= _context.Products.Find(id);
            if(dbProducts!=null){
                return dbProducts;
            }else{
                return NotFound();
            }

        }
    }
