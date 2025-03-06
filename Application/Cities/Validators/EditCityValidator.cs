using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.Commands;
using Application.Cities.DTOs;
using FluentValidation;

namespace Application.Cities.Validators
{
    public class EditCityValidator : BaseCityValidator<EditCity.Command, EditCityDto>
    {
        public EditCityValidator() : base(x => x.CityDto)
        {
            RuleFor(x => x.CityDto.Id).NotEmpty().WithMessage("Id is required");
        }
    }
}