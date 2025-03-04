using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Cities.DTOs
{
    public class BaseCityDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        // public DateTime CreateDate { get; set; }
        // public DateTime UpdateDate { get; set; }
    }
}