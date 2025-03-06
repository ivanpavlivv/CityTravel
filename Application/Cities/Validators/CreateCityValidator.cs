using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.Commands;
using Application.Cities.DTOs;
using FluentValidation;

namespace Application.Cities.Validators
{
    public class CreateCityValidator : BaseCityValidator<CreateCity.Command, CreateCityDto>
    {
        public CreateCityValidator() : base(x => x.CityDto)
        {

        }
    }
}