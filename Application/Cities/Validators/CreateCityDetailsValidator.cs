using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.Commands;
using Application.Cities.DTOs;

namespace Application.Cities.Validators
{
    public class CreateCityDetailsValidator : BaseCityDetailsValidator<CreateCityDetails.Command, CreateCityDetailsDto>
    {
        public CreateCityDetailsValidator() : base(x => x.DetailsDto)
        {

        }
    }
}