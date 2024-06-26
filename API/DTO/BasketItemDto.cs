using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public long Price { get; set; }
        public string? PictureURL { get; set; }
        public string? Brand { get; set; }
        public string? Type { get; set; }
        public int Quantity { get; set; }
    }
}