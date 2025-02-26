using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Cities.DTOs
{
    public class EditCityDetailsDto : BaseCityDetailsDto
    {
        public string Id { get; set; } = "";
    }
}