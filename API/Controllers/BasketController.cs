using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController : BaseApiController
    {
        private readonly StoreContext Context;

        public BasketController(StoreContext context){
            Context = context;

        }
        
        
        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>>GetBasket()
    {
        var basket = await RetrieveBasket();


        if (basket == null) return NotFound();
        return MapBasketToDto(basket);
    }

   

    [HttpPost]

        public async Task<ActionResult<BasketItemDto>> AddItemToBasket(int productId, int quantity){
            var basket=await RetrieveBasket();
            if(basket==null) basket = CreateBasket();

            var product=await Context.Products.FindAsync(productId);
            if(product==null) return NotFound();

            basket.AddItem(product, quantity);
            var result=await Context.SaveChangesAsync()>0;
           if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
           


           return BadRequest(new ProblemDetails{Title="Problem saving data to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity){
            var basket= await RetrieveBasket();
            if(basket==null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result=await Context.SaveChangesAsync()>0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem removing item from the basket"});

        }

         private async Task<Basket?> RetrieveBasket(){
            return await Context.Baskets
                .Include(i=>i.Items)
                .ThenInclude(p=>p.Product)
                .FirstOrDefaultAsync(x=>x.BuyerId==Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket(){
            var buyerId=Guid.NewGuid().ToString();
            var cookieOptions=new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket=new Basket{BuyerId=buyerId};
            Context.Baskets.Add(basket);
            return basket;
        }
        
         private BasketDto MapBasketToDto(Basket? basket)
    {
        if (basket == null)
        {
            
            throw new ArgumentNullException(nameof(basket));
        }
        
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureURL = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            }
            ).ToList()
        };
    }


    
    }