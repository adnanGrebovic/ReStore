using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {

            var query= _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerms)
            .Filter(productParams.Brand, productParams.Type)
            .AsQueryable();  

       

        var products= await PagedList<Product>.ToPagedList(query, productParams.PageNumber,productParams.PageSize);
        Response.AddPaginationHeader(products.MetaData);
        return products;

        }
        
         [HttpGet("{id}")]
        public ActionResult<Product>GetProduct(int id) 
        { 
            var dbProducts= _context.Products.Find(id);
            if(dbProducts!=null){
                return dbProducts;
            }
            else{
                return NotFound();
            }

        }



        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands= await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var types= await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

            return Ok(new{brands, types});
        }

    }
