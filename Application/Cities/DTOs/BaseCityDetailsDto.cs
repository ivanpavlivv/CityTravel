using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Cities.DTOs
{
    public class BaseCityDetailsDto
    {
        public double CostOfFood { get; set; }
        public double TaxiCost { get; set; }
        public double ApartmentCost { get; set; }
        public double RentCost { get; set; }
        // public DateTime CreateDate { get; set; }
        // public DateTime UpdateDate { get; set; }
        public string CityId { get; set; } = string.Empty;
    }
}