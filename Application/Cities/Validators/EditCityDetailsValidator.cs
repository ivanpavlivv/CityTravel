using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.Commands;
using Application.Cities.DTOs;
using FluentValidation;

namespace Application.Cities.Validators
{
    public class EditCityDetailsValidator : BaseCityDetailsValidator<EditCityDetails.Command, EditCityDetailsDto>
    {
        public EditCityDetailsValidator() : base(x => x.DetailsDto)
        {
            RuleFor(x => x.DetailsDto.Id).NotEmpty().WithMessage("Id is required");
        }
    }
}